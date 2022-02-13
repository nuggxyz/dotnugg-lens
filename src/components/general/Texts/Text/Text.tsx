import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';
import { animated, AnimatedProps } from 'react-spring';

import Colors from '../../../../lib/colors';

import styles from './Text.styles';

export interface TextProps {
    children: string | string[] | ReactNode;
    weight?: 'light' | 'regular' | 'bold' | 'bolder';
    size?: 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';
    type?: 'title' | 'text';
    textStyle?: CSSProperties | AnimatedProps<CSSProperties>;
}

const Text: FunctionComponent<TextProps> = ({
    children,
    weight = 'regular',
    size = 'medium',
    type = 'title',
    textStyle,
}) => {
    const style = {
        ...styles[type],
        ...styles[weight],
        ...styles[size],
        ...textStyle,
    };
    return <animated.div style={style}>{children}</animated.div>;
};

export default React.memo(Text);
