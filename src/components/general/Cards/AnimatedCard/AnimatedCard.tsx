import React, { FunctionComponent, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

const calc = (x, y, rect) => [
    -(y - rect.top - rect.height / 2) / 5,
    (x - rect.left - rect.width / 2) / 5,
    2,
];
const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AnimatedCard: FunctionComponent<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const ref = useRef(null);
    const [xys, set] = useState([0, 0, 1]);
    const props = useSpring({ xys, config: config.molasses });
    return (
        <div
            ref={ref}
            style={{
                // width: '100%',
                // height: '100%',
                zIndex: 100,
                cursor: 'none',
            }}>
            <animated.div
                style={{
                    transform: props.xys.to(trans),
                }}
                onMouseLeave={() => set([0, 0, 1])}
                onMouseMove={(e) =>
                    set(
                        calc(
                            e.clientX,
                            e.clientY,
                            ref.current.getBoundingClientRect(),
                        ),
                    )
                }>
                {children}
            </animated.div>
        </div>
    );
};

export default React.memo(AnimatedCard);
