import React, { FunctionComponent, useRef, useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';

const calc = (x: number, y: number, rect: DOMRect) => [
    -(y - rect.top - rect.height / 2) / 5,
    (x - rect.left - rect.width / 2) / 5,
    2,
];
const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AnimatedCard: FunctionComponent<React.PropsWithChildren<{ disable?: boolean }>> = ({
    children,
    disable = false,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [xys, set] = useState([0, 0, 1]);
    const props = useSpring({ xys, config: config.molasses });
    return (
        <div
            ref={ref}
            style={{
                zIndex: 1,
                // cursor: 'none',
            }}
        >
            <animated.div
                className={!disable ? 'animated-card-enabled' : ''}
                style={{
                    transform: props.xys.to(trans),
                }}
                onMouseLeave={() => !disable && set([0, 0, 1])}
                onMouseMove={(e) => {
                    if (!ref.current) {
                        throw new Error(
                            'components:Cards:AnimatedCard:AnimatedCard | ref.current is undefined',
                        );
                    }
                    if (!disable) {
                        set(calc(e.clientX, e.clientY, ref.current.getBoundingClientRect()));
                    }
                }}
            >
                {children}
            </animated.div>
        </div>
    );
};

export default React.memo(AnimatedCard);
