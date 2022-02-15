import React, {
    CSSProperties,
    FunctionComponent,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { animated, config, SpringProps, useSpring } from 'react-spring';

import useIsVisible from '../../../hooks/useIsVisible';

import { ListRenderItemProps } from './List';
import styles from './List.styles';

type Props = {
    data: { title: string; items: any[] }[];
    ChildRenderItem: FunctionComponent<ListRenderItemProps<any>>;
    TitleRenderItem: FunctionComponent<{ title: string }>;
    FeatureRenderItem: FunctionComponent<{
        feature: string;
        isSelected: boolean;
        onClick: () => void;
        numberOfItems: number;
    }>;
    extraData: any[];
    style?: CSSProperties | SpringProps;
    styleLeft?: CSSProperties;
    styleRight?: CSSProperties;
    Children?: FunctionComponent<any>;
};

const StickyList: FunctionComponent<PropsWithChildren<Props>> = ({
    data,
    ChildRenderItem,
    TitleRenderItem,
    FeatureRenderItem,
    extraData,
    style,
    styleLeft,
    styleRight,
    children,
    ...props
}) => {
    const refData = useMemo(
        () =>
            data.map((item) => {
                return {
                    ...item,
                    ref: React.createRef<HTMLDivElement>(),
                };
            }),
        [data],
    );
    const [animating, setAnimating] = useState(false);
    const listRef = useRef<HTMLDivElement>();

    const [y, setY] = useSpring(() => ({
        immediate: false,
        y: 0,
        onChange: (props) => {
            listRef.current.scroll(0, props.value.y);
        },
        config: config.default,
        onStart: () => setAnimating(true),
        onRest: () => setAnimating(false),
    }));
    const [current, setCurrent] = useState(refData?.map((item) => item.title));

    return (
        <animated.div style={{ display: 'flex', ...style }}>
            <div style={styleLeft}>
                {refData.map((item, index) =>
                    refData[index].items.length > 0 ? (
                        <React.Fragment key={`feature-${index}`}>
                            <FeatureRenderItem
                                onClick={() =>
                                    setY({
                                        y:
                                            item.ref.current.getBoundingClientRect()
                                                .top +
                                            listRef.current.scrollTop -
                                            listRef.current.offsetHeight / 4.7,
                                    })
                                }
                                isSelected={!current.includes(item.title)}
                                feature={item.title}
                                numberOfItems={refData[index].items.length}
                            />
                        </React.Fragment>
                    ) : // <div
                    //     onClick={() => {
                    //         setY({
                    //             y:
                    //                 item.ref.current.getBoundingClientRect()
                    //                     .top +
                    //                 listRef.current.scrollTop -
                    //                 261,
                    //         });
                    //     }}
                    //     style={{
                    //         background: !current.includes(item.title)
                    //             ? 'red'
                    //             : 'transparent',
                    //     }}>
                    //     {item.title}
                    // </div>
                    null,
                )}
            </div>
            <div
                style={{ height: '100%', overflow: 'scroll', ...styleRight }}
                ref={listRef}>
                {refData.map((item, index) =>
                    refData[index].items.length > 0 ? (
                        <React.Fragment key={`list-${index}`}>
                            <RenderItem
                                {...{
                                    item,
                                    TitleRenderItem,
                                    ChildRenderItem,
                                    extraData: [
                                        ...extraData,
                                        animating,
                                        refData.map((item) => item.title),
                                    ],
                                    setCurrent,
                                }}
                            />
                        </React.Fragment>
                    ) : null,
                )}
            </div>
            {children && children}
        </animated.div>
    );
};

export default StickyList;

const RenderItem = ({
    item,
    TitleRenderItem,
    ChildRenderItem,
    extraData,
    setCurrent,
}) => {
    // const [ref, isVisible] = useIsVisible();

    // useEffect(() => {
    //     setCurrent((currents: any[]) => {
    //         if (!isVisible) {
    //             return currents.insert(item.title);
    //         } else {
    //             return currents.remove(item.title);
    //         }
    //     });
    // }, [isVisible]);

    return (
        <div id={item.title} ref={item.ref}>
            <div
                // ref={ref}
                style={styles.sticky}>
                <TitleRenderItem title={item.title} />
            </div>
            {item.items.map((item, index) => (
                <React.Fragment key={`child-${index}`}>
                    <ChildRenderItem {...{ index, item, extraData }} />
                </React.Fragment>
            ))}
        </div>
    );
};
