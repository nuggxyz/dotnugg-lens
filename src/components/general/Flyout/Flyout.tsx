/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import { animated, AnimatedProps, config, useTransition } from '@react-spring/web';

import useOnClickOutside from '@src/hooks/useOnClickOutside';
// import useDimensions from '@src/client/hooks/useDimensions';
// import client from '@src/client';

import styles from './Flyout.styles';

type Props = {
    button: JSX.Element;
    style?: AnimatedProps<any>;
    containerStyle?: CSSProperties;
    float?: 'left' | 'right';
    top?: number;
    triggerWidth?: string;
    openOnHover?: boolean;
};

const Flyout: FunctionComponent<PropsWithChildren<Props>> = ({
    style,
    button,
    children,
    containerStyle,
    float = 'right',
    top = 0,
    triggerWidth = '50px',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openOnHover = false,
}) => {
    const [open, setOpen] = React.useState(false);
    // const [closing, setClosing] = React.useState(false);
    // const [openRef, openHover] = useOnHover(() => {
    //     if (openOnHover) setOpen(true);
    // });

    // const [closeRef, closeHover] = useOnHover(() => {
    //     if (openOnHover) setOpen(openHover || closeHover);
    //     else if (open && !closeHover) setOpen(false);
    // });
    // const { screen } = useDimensions();
    // const dimentions = client.live.dimentions();

    const ref = React.useRef(null);

    useOnClickOutside<HTMLDivElement>(ref, () => {
        setOpen(false);
    });

    const transition = useTransition(open, {
        from: {
            pointerEvents: 'none' as const,
            opacity: 0,
            y: -5,
        },
        enter: { opacity: 1, pointerEvents: 'auto' as const, y: 0 },
        leave: { opacity: 0, pointerEvents: 'none' as const, y: -5 },
        config: config.stiff,
        // onStart: () => {
        //     setClosing(false);
        // },
        // onDestroyed: () => {
        //     setClosing(true);
        // },
    });

    return (
        <div
            style={{ cursor: 'pointer', ...containerStyle }}
            ref={ref}
            aria-hidden="true"
            onClick={() => {
                setOpen(!open);
            }}
        >
            <div aria-hidden="true" role="button" onClick={() => setOpen(!open)}>
                {button}
            </div>
            {transition((animatedStyle, isOpen) =>
                isOpen ? (
                    <>
                        <animated.div
                            style={{
                                ...animatedStyle,
                                width: triggerWidth,
                                height: '100px',
                                position: 'absolute' as const,
                                top: 0,
                                marginTop: top,
                                [float]: 0,
                            }}
                        >
                            <div
                                // ref={openRef}
                                style={{
                                    ...styles.container,
                                    ...style,
                                    zIndex: 1100,
                                }}
                            >
                                {children}
                            </div>
                        </animated.div>
                        {/* {screen === 'phone' && (
                            <div
                                aria-hidden="true"
                                style={{
                                    cursor: 'default',
                                    position: 'absolute',
                                    zIndex: 1099,
                                    ...dimentions,
                                    top: 0,
                                    background: 'red',
                                    right: 0,
                                }}
                                onClick={() => {}}
                            />
                        )} */}
                    </>
                ) : null,
            )}
        </div>
    );
};

export default React.memo(Flyout);
