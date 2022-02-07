import React, {
    CSSProperties,
    FunctionComponent,
    RefCallback,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import Text from '../Texts/Text/Text';
import Loader from '../Loader/Loader';
import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrBooleanFalse,
    isUndefinedOrNullOrNotFunction,
} from '../../../lib';
import useOnScroll from '../../../hooks/useOnScroll';
import usePrevious from '../../../hooks/usePrevious';
import useIsVisible from '../../../hooks/useIsVisible';

import styles from './List.styles';

export type ListRenderItemProps<T> = {
    item: T;
    extraData?: any[];
    action?: any;
    onScrollEnd?: any;
    index: number;
    rootRef?: any;
    selected?: boolean;
    style?: CSSProperties;
};

type Props = {
    data: any[];
    RenderItem: FunctionComponent<ListRenderItemProps<any>>;
    loading?: boolean;
    extraData?: any[];
    action?: any;
    onScrollEnd?: any;
    label?: string;
    border?: boolean;
    horizontal?: boolean;
    style?: CSSProperties;
    onScroll?: RefCallback<any>;
    selected?: any;
    listEmptyText?: string;
    labelStyle?: CSSProperties;
    listEmptyStyle?: CSSProperties;
    loaderColor?: string;
    TitleButton?: FunctionComponent;
    // itemHeight: number;
};

const List: FunctionComponent<Props> = ({
    data = [],
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
}) => {
    const ref = useOnScroll(onScroll);
    const containerStyle = useMemo(() => {
        return {
            ...styles.container,
            ...(border && styles.border),
            ...(horizontal && styles.horizontal),
            ...style,
        };
    }, [border, horizontal, style]);

    const List = useCallback(
        ({ selected }) =>
            !isUndefinedOrNullOrArrayEmpty(data) ? (
                <>
                    {data.map((item, index) => (
                        <RenderItem
                            item={item}
                            key={JSON.stringify(item)}
                            index={index}
                            extraData={extraData}
                            action={action}
                            selected={
                                JSON.stringify(selected) ===
                                JSON.stringify(item)
                            }
                        />
                    ))}
                </>
            ) : (
                <div
                    style={{
                        ...styles.container,
                        justifyContent: 'center',
                    }}>
                    {!loading && (
                        <Text
                            weight="light"
                            size="small"
                            type="text"
                            textStyle={listEmptyStyle}>
                            {listEmptyText || 'No items to display...'}
                        </Text>
                    )}
                </div>
            ),
        [data, action, extraData, RenderItem, listEmptyText, loading],
    );

    const Loading = useCallback(
        () => (
            <div
                style={{
                    marginTop: '1rem',
                    height: '1rem',
                    position: 'relative',
                }}>
                {loading && <Loader color={loaderColor || 'black'} />}
            </div>
        ),
        [loading, loaderColor],
    );

    const Label = useCallback(
        () =>
            label ? (
                <Text textStyle={{ ...styles.label, ...labelStyle }}>
                    {label}
                </Text>
            ) : null,
        [label, labelStyle],
    );

    return (
        <>
            <div style={styles.labelContainer}>
                <Label />
                {TitleButton && <TitleButton />}
            </div>
            <div style={containerStyle} ref={ref}>
                <List selected={selected} />
                <Loading />
                {!isUndefinedOrNullOrNotFunction(onScrollEnd) && (
                    <EndOfListAnchor
                        onScrollEnd={onScrollEnd}
                        rootRef={ref}
                        loading={loading}
                    />
                )}
            </div>
        </>
    );
};

export default React.memo(List);

const EndOfListAnchor = ({ rootRef, onScrollEnd, loading }) => {
    const [ref, isVisible] = useIsVisible(rootRef.current, '10px');
    const prevVisible = usePrevious(isVisible);
    useEffect(() => {
        if (
            !isUndefinedOrNullOrBooleanFalse(isVisible) &&
            isVisible !== prevVisible &&
            !loading
        ) {
            onScrollEnd();
        }
    }, [isVisible, prevVisible, loading]);

    return <div ref={ref} key="NUGGNUGGNUGGNUGGNUGG" />;
};
