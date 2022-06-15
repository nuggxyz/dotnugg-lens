import React, {
    CSSProperties,
    FunctionComponent,
    LegacyRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useForceUpdate from '@src/hooks/useForceUpdate';

import Text from '@src/components/general/Texts/Text/Text';
import Loader from '@src/components/general/Loader/Loader';
import { isUndefinedOrNullOrArrayEmpty, range } from '@src/lib';
import usePrevious from '@src/hooks/usePrevious';

import styles from './List.styles';

export interface InfiniteListRenderItemProps<T, B, A> {
    item: T;
    extraData: B;
    action?: (arg: A) => void;
    onScrollEnd?: ({ addToList }: { addToList: boolean }) => void;
    index: number;
    rootRef?: LegacyRef<HTMLDivElement>;
    selected?: boolean;
    style?: CSSProperties;
}

export interface InfiniteListProps<T, B, A> {
    id?: string;
    data: T[];
    RenderItem: FunctionComponent<InfiniteListRenderItemProps<T, B, A>>;
    loading?: boolean;
    extraData: B;
    action?: (arg: A) => void;
    onScrollEnd?: ({ addToList }: { addToList: boolean }) => void;
    label?: string;
    border?: boolean;
    horizontal?: boolean;
    style?: CSSProperties;
    onScroll?: () => void;
    selected?: unknown;
    listEmptyText?: string;
    labelStyle?: CSSProperties;
    listEmptyStyle?: CSSProperties;
    loaderColor?: string;
    itemHeight: number;
    animationToggle?: boolean;
    TitleButton?: FunctionComponent;
    titleLoading?: boolean;
    interval?: number;
    startGap?: number;
    endGap?: number;
    deep?: boolean;
    skipSelectedCheck?: boolean;
    disableScroll?: boolean;
    squishFactor?: number;
    initialIndex?: number;

    externalScrollTop?: number;
    scrollTopOffset?: number;

    coreRef?: React.RefObject<HTMLDivElement> | null;
    offsetListRef?: boolean;
}

const LIST_PADDING = 4;

const InfiniteList = <T, B, A>({
    id,
    data,
    RenderItem,
    loading = false,
    extraData,
    action,
    onScrollEnd,
    label,
    border = false,
    horizontal = false,
    style,
    onScroll,
    selected,
    listEmptyText,
    labelStyle,
    loaderColor,
    listEmptyStyle,
    itemHeight = 10,
    animationToggle,
    TitleButton,
    titleLoading,
    interval: _interval = 25,
    startGap,
    endGap,
    skipSelectedCheck = false,
    disableScroll = false,
    coreRef = null,
    deep = false,
    // initialIndex = 0,
    // externalScrollTop,
    // scrollTopOffset,
    squishFactor = 1,
    offsetListRef = false,
}: InfiniteListProps<T, B, A>) => {
    const [interval] = React.useState(_interval * squishFactor);

    const windowRef = useRef<HTMLDivElement>(null);

    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        if (coreRef?.current) {
            let check = coreRef.current.scrollHeight;
            if (offsetListRef && windowRef?.current) check -= windowRef.current.offsetHeight;
            setWindowHeight(check);
        } else if (windowRef.current) {
            setWindowHeight(windowRef.current.scrollHeight);
        }
    }, [coreRef, windowRef, animationToggle, offsetListRef]);

    const [trueScrollTop, setTrueScrollTop] = useState(0);
    const [scrollTopOffset, setScrollTopOffset] = useState(0);

    const scrollTop = useMemo(
        () =>
            scrollTopOffset === 0
                ? trueScrollTop
                : trueScrollTop - scrollTopOffset - (startGap || 0),
        [trueScrollTop, scrollTopOffset, startGap],
    );

    const innerHeight = useMemo(
        () => data.length * itemHeight * squishFactor,
        [data, itemHeight, squishFactor],
    );

    const startIndex = useMemo(
        () => Math.max(Math.floor(scrollTop / itemHeight) - LIST_PADDING, 0),
        [scrollTop, itemHeight],
    );

    const endIndex = useMemo(
        () =>
            Math.min(
                data.length - 1,
                scrollTop + windowHeight === 0
                    ? 0
                    : Math.ceil((scrollTop + windowHeight) / itemHeight) + LIST_PADDING,
            ),
        [scrollTop, data.length, windowHeight, itemHeight],
    );
    const prevStart = usePrevious(startIndex);
    const prevEnd = usePrevious(endIndex);
    const prevData = usePrevious(data);

    const [items, setItems] = useState<JSX.Element[]>([]);
    // const prevItems = usePrevious(items);

    const force = useForceUpdate();

    // useEffect(() => {
    //     console.log('WHOA', items.length, prevItems?.length);
    //     if (items.length !== (prevItems?.length || 0)) force();
    // }, [items.length, prevItems?.length, force]);

    const builderCallback = React.useCallback(() => {
        const key = (i: number) => `infinte-item-${id || 'unknown'}-${i}`;

        const buildItem = (i: number) => (
            <div
                key={key(i)}
                style={{
                    position: 'absolute',
                    top: `${i * itemHeight}px`,
                    width: '100%',
                    height: `${itemHeight}px`,
                }}
            >
                <RenderItem
                    item={data[i]}
                    index={i}
                    extraData={extraData}
                    action={action}
                    selected={
                        !skipSelectedCheck && JSON.stringify(selected) === JSON.stringify(data[i])
                    }
                />
            </div>
        );
        setItems((_items) => {
            if (
                data &&
                prevData &&
                (data.length < prevData.length ||
                    (data.length > 0 &&
                        prevData.length > 0 &&
                        JSON.stringify(data[0]) !== JSON.stringify(prevData[0])))
            ) {
                _items = data.map((_, i) => buildItem(i));
                return _items;
            }

            if (!(startIndex === endIndex && endIndex === 0)) {
                range(startIndex, endIndex).forEach((i) => {
                    if (!_items[i - startIndex] || _items[i - startIndex].key !== key(i)) {
                        const check = _items.findIndex(
                            (x) => x.key !== undefined && x.key === key(i),
                        );
                        if (check !== -1) {
                            _items.splice(check, 1);
                        }

                        _items[i - startIndex] = buildItem(i);
                    }
                });
            } else if (_items.length === 0 && data.length > 0) {
                for (let i = 0; i < Math.min(data.length, 25); i++) {
                    _items[i] = buildItem(i);
                }
            }
            return _items;
        });
    }, [
        id,
        endIndex,
        startIndex,
        RenderItem,
        action,
        data,
        prevData,
        extraData,
        selected,
        itemHeight,
        skipSelectedCheck,
    ]);

    // console.log({ data, items });

    useEffect(() => {
        if (
            prevEnd !== endIndex ||
            prevStart !== startIndex ||
            (deep
                ? JSON.stringify(prevData) !== JSON.stringify(data)
                : prevData?.length !== data.length)
        ) {
            builderCallback();
            force();
        }
    }, [
        builderCallback,
        endIndex,
        startIndex,
        prevEnd,
        prevStart,
        data,
        data.length,
        deep,
        prevData,
        force,
        items,
    ]);

    const [lastGrabValue, setLastGrabValue] = React.useState<number>(0);

    const lastGrab = React.useCallback(
        (end: number) => {
            if (onScrollEnd) {
                const floor = Math.floor(end / (interval - LIST_PADDING - 1));
                if (
                    items.length !== 0 &&
                    items.length * itemHeight + scrollTop >= innerHeight &&
                    prevEnd !== end &&
                    (lastGrabValue === 0 || floor !== lastGrabValue) &&
                    !loading
                ) {
                    setLastGrabValue(floor);
                    void onScrollEnd({ addToList: true });
                }
            }
        },
        [
            scrollTop,
            items,
            innerHeight,
            onScrollEnd,
            prevEnd,
            loading,
            itemHeight,
            interval,
            lastGrabValue,
        ],
    );

    useEffect(() => {
        lastGrab(endIndex);
    }, [lastGrab, endIndex]);

    // console.log({ scrollTop, endIndex, startIndex, trueScrollTop, scrollTopOffset });
    const _onScroll = useCallback(
        (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
            const st = ev.currentTarget.scrollTop;
            if (offsetListRef) {
                // st = windowRef.current.offsetTop - st;
                setScrollTopOffset(ev.currentTarget.offsetHeight || 0);
            }

            setTrueScrollTop(st);
            if (onScroll) onScroll();
        },
        [onScroll, offsetListRef, windowRef],
    );

    useEffect(() => {
        if (coreRef && coreRef.current) {
            // @ts-ignore
            coreRef.current.onscroll = _onScroll;
            // coreRef.current.scrollTo({ top: 0 });
        } else if (windowRef && windowRef.current) {
            // @ts-ignore
            windowRef.current.onscroll = _onScroll;
        }
    }, [coreRef, _onScroll]);

    const containerStyle = useMemo(() => {
        return {
            ...styles.container,
            ...(border && styles.border),
            ...(horizontal && styles.horizontal),
            ...style,
        };
    }, [border, horizontal, style]);

    const List = useCallback(
        () =>
            !isUndefinedOrNullOrArrayEmpty(items) ? (
                <div
                    style={{
                        position: 'relative',
                        height: `${innerHeight}px`,
                        width: '100%',
                    }}
                >
                    {items}
                </div>
            ) : (
                <div
                    style={{
                        ...styles.container,
                        justifyContent: 'center',
                    }}
                >
                    {!loading && (
                        <Text weight="light" size="small" type="text" textStyle={listEmptyStyle}>
                            {listEmptyText || 'No items to display...'}
                        </Text>
                    )}
                </div>
            ),
        [items, listEmptyText, loading, innerHeight, listEmptyStyle],
    );

    const Loading = useCallback(
        () =>
            loading ? (
                <div
                    style={{
                        marginTop: '1rem',
                        position: 'absolute',
                        top: `${(endIndex + 1) * itemHeight}px`,
                        width: '100%',
                        height: `${itemHeight}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Loader color={loaderColor || 'black'} />
                </div>
            ) : (
                <div />
            ),
        [loading, loaderColor, itemHeight, endIndex],
    );

    const Label = useCallback(
        () =>
            label ? (
                <Text
                    textStyle={{
                        ...styles.label,
                        ...labelStyle,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {label}
                    {titleLoading && (
                        <Loader color={loaderColor || 'black'} style={{ marginLeft: '.5rem' }} />
                    )}
                </Text>
            ) : null,
        [label, labelStyle, titleLoading, loaderColor],
    );

    return (
        <>
            {(label || TitleButton) && (
                <div style={styles.labelContainer}>
                    {label && <Label />}
                    {TitleButton && <TitleButton />}
                </div>
            )}
            <div
                id={`${id || 0}infinite`}
                ref={windowRef}
                style={{
                    ...containerStyle,
                    ...(!disableScroll ? { overflow: 'scroll' } : { overflow: undefined }),
                    justifySelf: 'flex-start',
                }}
                onScroll={_onScroll}
            >
                {startGap && startGap !== 0 && (
                    <div style={{ width: '100%', marginTop: startGap }} />
                )}

                <List />
                <Loading />

                {endGap && endGap !== 0 && <div style={{ width: '100%', marginTop: endGap }} />}
            </div>
        </>
    );
};

export default React.memo(InfiniteList) as typeof InfiniteList;
