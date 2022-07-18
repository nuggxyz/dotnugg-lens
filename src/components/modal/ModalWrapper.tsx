import React, { FC, useMemo, useRef, useEffect } from 'react';
import { animated, config, useSpring, useTransition } from '@react-spring/web';

import lib from '@src/lib';
import useOnClickOutside from '@src/hooks/useOnClickOutside';
import useAnimateOverlay from '@src/hooks/useAnimateOverlay';
import client from '@src/client';
import { ModalEnum, ModalType } from '@src/interfaces/modals';
import useDimensions from '@src/hooks/useDimensions';

import AsepriteModal from './AsepriteModal/AsepriteModal';

const getter = ({ data }: { data?: ModalType }) => {
    switch (data?.modalType) {
        case ModalEnum.Aseprite:
            return <AsepriteModal />;
        case undefined:
        default:
            return null;
    }
};

export const ModalSwitch = () => {
    const data = client.modal.useData();
    const comp = useMemo(() => getter({ data }), [data]);
    const transition = useTransition(comp, {
        from: {
            pointerEvents: 'none' as const,
            opacity: 0,
            position: 'relative' as const,
        },
        enter: { opacity: 1, pointerEvents: 'auto' as const, position: 'absolute' as const },
        leave: { opacity: 0, pointerEvents: 'none' as const, position: 'absolute' as const },
        config: config.stiff,
    });
    return transition(
        (style, Item) =>
            Item && (
                <animated.div style={{ ...style, padding: '1rem', width: '100%' }}>
                    {Item}
                </animated.div>
            ),
    );
};

const Modal: FC<unknown> = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const isOpen = client.modal.useOpen();
    const data = client.modal.useData();
    const closeModal = client.modal.useCloseModal();

    const dim = useDimensions();

    const wrapperHeight = useMemo(() => dim.height / 1.5, [dim.height]);

    const clickBoundaryRef = useRef<HTMLDivElement>(null);

    const style = useAnimateOverlay(isOpen, { zIndex: '999000' });

    useOnClickOutside(clickBoundaryRef, closeModal);

    const [{ height }, animate] = useSpring(
        () => ({
            height: `${wrapperHeight}px`,
        }),
        [wrapperHeight],
    );

    useEffect(() => {
        animate({
            height: `${
                data && contentRef.current ? contentRef.current.offsetHeight : wrapperHeight
            }px`,
        });
    }, [animate, contentRef, data, wrapperHeight]);

    return (
        // @ts-ignore
        <animated.div style={{ ...style }}>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <animated.div
                    style={{
                        ...styles.containerBackground,
                        ...styles.containerFull,
                        ...(data && data?.backgroundStyle ? data?.backgroundStyle : {}),
                        transform: isOpen ? 'translate(-4px, -4px)' : 'translate(-24px, -24px)',
                        display: 'auto',
                        height,
                        transition: `background .5s ${lib.layout.animation}, transform .5s ${lib.layout.animation}`,
                    }}
                />
                <animated.div
                    style={{
                        ...styles.container,
                        ...styles.containerFull,
                        transform: isOpen ? 'translate(8px, 8px)' : 'translate(36px, 36px)',
                        ...data?.containerStyle,
                        height,
                        // overflow: isOpen ? 'auto' : 'hidden',
                        transition: `background .5s ${lib.layout.animation}, transform .5s ${lib.layout.animation}`,
                    }}
                    ref={clickBoundaryRef}
                >
                    <div
                        ref={contentRef}
                        style={{
                            position: 'absolute',
                            width: '100%',
                        }}
                    >
                        <ModalSwitch />
                    </div>
                </animated.div>
            </div>
        </animated.div>
    );
};

const styles = lib.layout.NLStyleSheetCreator({
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        background: 'transparent',
        transition: `opacity .5s ${lib.layout.animation}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 99900000,
    },
    open: {
        opacity: 1,
        background: lib.colors.transparentGrey,
        zIndex: 99900000,
        overflow: 'hidden',
    },
    closed: {
        opacity: 0,
        background: 'transparent',
    },
    container: {
        background: lib.colors.semiTransparentWhite,
        backdropFilter: 'blur(20px)',
        // commented out to fix issue #64
        // WebkitBackdropFilter: 'blur(20px)',
        transition: `.2s all ${lib.layout.animation}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: lib.layout.borderRadius.largish,
        // padding: '1rem',
        width: '100%',
        transform: 'translate(1.5rem, 1.5rem)',
    },
    containerFull: { width: '630px' },
    containerMobile: {
        width: '90%',
        maxHeight: '100%',
        margin: '0rem',
        // margin: '0rem .5rem',
        transform: 'translate(0rem, 0rem)',
        justifyContent: 'flex-start',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        minWidth: '0px',
    },
    containerOpen: {
        transform: 'translate(.5rem, .5rem)',
    },
    containerBackground: {
        position: 'absolute',
        background: lib.colors.gradient2Transparent,
        transition: `.2s all ${lib.layout.animation}`,
        opacity: 1,
        width: '100%',
        padding: '1rem',
        height: '100%',
        borderRadius: lib.layout.borderRadius.largish,
    },
    containerBackgroundOpen: { transform: 'translate(-.2rem, -.2rem)' },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export default React.memo(Modal);
