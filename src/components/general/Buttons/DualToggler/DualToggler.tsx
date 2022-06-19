import { animated, config, useSpring } from '@react-spring/web';
import React, { CSSProperties } from 'react';
import { IconType } from 'react-icons/lib';

import useMeasure from '@src/hooks/useMeasure';
import lib from '@src/lib';

const DualToggler = ({
    activeIndex,
    containerStyle,
    floaterStyle,
    toggleActiveIndex,
    LeftIcon,
    RightIcon,
}: {
    activeIndex: 0 | 1;
    containerStyle?: CSSProperties;
    floaterStyle?: CSSProperties;
    toggleActiveIndex: (input: 0 | 1) => undefined;
    LeftIcon: IconType;
    RightIcon: IconType;
    inverted?: boolean;
}) => {
    const [headerRef, { width: WIDTH }] = useMeasure();

    const selectionIndicatorSpring = useSpring({
        to: {
            x: activeIndex * (WIDTH / 2) - 22.5,
        },
        config: config.stiff,
    });

    return (
        <div
            ref={headerRef}
            style={{
                display: 'flex',
                zIndex: 300010,
                width: 90,
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative',
                ...containerStyle,
            }}
        >
            <animated.div
                style={{
                    // top: -5,
                    width: `40px`,
                    height: `40px`,
                    ...selectionIndicatorSpring,
                    position: 'absolute',
                    zIndex: -1,
                    background: lib.colors.transparentWhite,
                    borderRadius: lib.layout.borderRadius.mediumish,
                    WebkitBackdropFilter: 'blur(30px)',
                    backdropFilter: 'blur(30px)',
                    display: 'flex',
                    ...floaterStyle,
                }}
            />
            <LeftIcon
                color={lib.colors.primaryColor}
                size={30}
                onClick={() => toggleActiveIndex(0)}
                className={activeIndex === 1 ? 'apply-drop-shadow' : ''}
            />
            <RightIcon
                color={lib.colors.primaryColor}
                size={30}
                onClick={() => toggleActiveIndex(1)}
                className={activeIndex === 0 ? 'apply-drop-shadow' : ''}
            />
        </div>
    );
};

export default DualToggler;
