import React, {
    CSSProperties,
    FunctionComponent,
    LegacyRef,
    RefCallback,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import { t } from '@lingui/macro';

import Text from '@src/components/general/Texts/Text/Text';
import Loader from '@src/components/general/Loader/Loader';
import { isUndefinedOrNullOrNotFunction } from '@src/lib';
import useOnScroll from '@src/hooks/useOnScroll';
import usePrevious from '@src/hooks/usePrevious';
import useIsVisible from '@src/hooks/useIsVisible';

import styles from './List.styles';

export interface ListRenderItemProps<ItemType, ExtraDataType, ActionArgType> {
    item: ItemType;
    extraData: ExtraDataType;
    action?: (arg: ActionArgType) => void;
    onScrollEnd?: (...args: any[]) => void;
    index?: number;
    rootRef?: LegacyRef<HTMLDivElement>;
    selected?: boolean;
    style?: CSSProperties;
}

export interface ListProps<T, B, A> {
    // eslint-disable-next-line react/no-unused-prop-types
    id?: string;
    RenderItem: FunctionComponent<ListRenderItemProps<T, B, A>>;
    loading?: boolean;
    extraData: B;
    action?: (arg: A) => void;
    onScrollEnd?: () => () => void;
    label?: string;
    border?: boolean;
    horizontal?: boolean;
    style?: CSSProperties;
    onScroll?: RefCallback<any>;
    selected?: T;
    listEmptyText?: string;
    labelStyle?: CSSProperties;
    listEmptyStyle?: CSSProperties;
    loaderColor?: string;
    TitleButton?: FunctionComponent;
    titleLoading?: boolean;
    itemHeight?: number;
    data: T[];
}

const EndOfListAnchor = ({
    rootRef,
    onScrollEnd,
    loading,
}: {
    rootRef: React.RefObject<HTMLDivElement>;
    onScrollEnd: (() => void) | undefined;
    loading: boolean;
}) => {
    const [ref, isVisible] = useIsVisible(rootRef.current, '10px');
    const prevVisible = usePrevious(isVisible);
    useEffect(() => {
        if (isVisible && isVisible !== prevVisible && !loading) {
            if (onScrollEnd) onScrollEnd();
        }
    }, [isVisible, prevVisible, loading, onScrollEnd]);

    return <div ref={ref} key="NUGGNUGGNUGGNUGGNUGG" />;
};

const List = <T, B, A>({
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
    TitleButton,
    titleLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    itemHeight = 10,
}: ListProps<T, B, A>) => {
    const ref = useOnScroll(onScroll);
    const containerStyle = useMemo(() => {
        return {
            ...styles.container,
            ...(border && styles.border),
            ...(horizontal && styles.horizontal),
            ...style,
        };
    }, [border, horizontal, style]);
    // yeah I am simplifying the search a good bit - I am moving all the logic outside the search list and into the search bar. Its hard to explain but I am going to set up a bunch of simple filters that allow easy searching of things. Long story short, List is all the search will need
    const ListCallback = useCallback(
        ({ selected: _selected }: { selected?: T }) =>
            data && data.length > 0 ? (
                <>
                    {data.map((item, index) => (
                        <RenderItem
                            item={item}
                            key={`bro-${index}`}
                            index={index}
                            extraData={extraData}
                            action={action}
                            selected={JSON.stringify(_selected) === JSON.stringify(item)}
                        />
                    ))}
                </>
            ) : (
                <div
                    style={{
                        ...styles.container,
                        justifyContent: 'center',
                    }}
                >
                    {!loading && (
                        <Text weight="light" size="small" type="text" textStyle={listEmptyStyle}>
                            {listEmptyText || t`No items to display...`}
                        </Text>
                    )}
                </div>
            ),
        [data, action, extraData, RenderItem, listEmptyText, loading, listEmptyStyle],
    );

    const Loading = useCallback(
        () =>
            loading ? (
                <div
                    style={{
                        marginTop: '1rem',
                        height: '1rem',
                        position: 'relative',
                    }}
                >
                    <Loader color={loaderColor || 'black'} />
                </div>
            ) : null,
        [loading, loaderColor],
    );

    const Label = useCallback(
        () =>
            label ? (
                <div style={styles.labelContainer}>
                    <div style={styles.title}>
                        <Text textStyle={{ ...styles.label, ...labelStyle }}>{label}</Text>
                        <div
                            style={{
                                marginLeft: '.5rem',
                                position: 'relative',
                            }}
                        >
                            {titleLoading && <Loader color={loaderColor || 'black'} />}
                        </div>
                    </div>
                    <div style={{ marginTop: '-2px' }}>{TitleButton && <TitleButton />}</div>
                </div>
            ) : null,
        [label, labelStyle, TitleButton, titleLoading, loaderColor],
    );

    return (
        <>
            <Label />
            <div style={containerStyle} ref={ref}>
                <ListCallback selected={selected} />
                <Loading />
                {!isUndefinedOrNullOrNotFunction(onScrollEnd) && (
                    <EndOfListAnchor onScrollEnd={onScrollEnd} rootRef={ref} loading={loading} />
                )}
            </div>
        </>
    );
};

export default React.memo(List) as typeof List;
