import React, {
    CSSProperties,
    FunctionComponent,
    PropsWithChildren,
} from 'react';
import { animated, config, useSpring } from 'react-spring';

type Props = { toggle: boolean; style?: CSSProperties };

const FadeInOut: FunctionComponent<PropsWithChildren<Props>> = ({
    style,
    toggle,
    children,
}) => {
    const { opacity } = useSpring({
        opacity: toggle ? 1 : 0,
        config: config.stiff,
    });
    return (
        <animated.div
            style={{
                opacity,
                display: 'flex',
                justifyContent: 'center',
                ...style,
            }}>
            {children}
        </animated.div>
    );
};

export default FadeInOut;
