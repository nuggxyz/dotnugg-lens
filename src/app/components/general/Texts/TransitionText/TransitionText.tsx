import { animated, config, useSpring } from '@react-spring/web';
import React, { CSSProperties, FunctionComponent } from 'react';

import useOnHover from '../../../../hooks/useOnHover';
import Text from '../Text/Text';

import styles from './TransitionText.styles';

type Props = {
    text: string;
    transitionText: string;
    onClick: () => void;
    style?: CSSProperties;
    Icon?: React.ReactElement;
};

const TransitionText: FunctionComponent<Props> = ({
    text,
    transitionText,
    onClick,
    style,
    Icon,
}) => {
    const [ref, isHovering] = useOnHover();

    const textStyle = useSpring({
        opacity: isHovering ? 0 : 1,
        paddingLeft: Icon ? '1.5rem' : '0rem',
        config: config.stiff,
    });
    const transitionTextStyle = useSpring({
        opacity: isHovering ? 1 : 0,
        paddingLeft: Icon ? '1.5rem' : '0rem',
        config: config.stiff,
    });
    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{ ...styles.container, ...style }}>
            {Icon && Icon}
            <animated.div style={{ ...styles.text, ...textStyle }}>
                <Text>{text}</Text>
            </animated.div>
            <animated.div style={{ ...styles.text, ...transitionTextStyle }}>
                <Text>{transitionText}</Text>
            </animated.div>
        </div>
    );
};

export default React.memo(TransitionText);
