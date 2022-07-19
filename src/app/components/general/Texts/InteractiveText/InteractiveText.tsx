import React, { CSSProperties, FunctionComponent, ReactChild, useState } from 'react';

import Text, { TextProps } from '@src/app/components/general/Texts/Text/Text';

import styles from './InteractiveText.styles';

type Props = {
    action: () => void;
    children: string | string[] | ReactChild | ReactChild[];
    isActive?: boolean;
    style?: CSSProperties;
    styleText?: CSSProperties;
    textSize?: 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';
    badge?: number | string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    color?: string;
    hideBorder?: boolean;
} & Partial<TextProps>;

const InteractiveText: FunctionComponent<Props> = ({
    action,
    children,
    isActive = false,
    style,
    styleText,
    textSize = 'medium',
    badge,
    leftIcon,
    rightIcon,
    color,
    hideBorder,
    ...props
}) => {
    const [hover, setHover] = useState(false);

    const customStyle = {
        ...styles.container,
        ...style,
    };

    const textStyle = {
        ...styles.innerContainer,
        ...styles.text,
        ...(color ? { color } : {}),
        ...((isActive || hover) && styles.selected),
    };

    const borderStyle = {
        ...styles.border,
        ...(color ? { background: color } : {}),
        ...((isActive || hover) && styles.borderSelected),
    };

    const badgeStyle = {
        ...styles.badgeStyle,
        ...((isActive || hover) && styles.badgeSelected),
    };

    return (
        <>
            {badge && <div style={badgeStyle}>{badge}</div>}
            <div
                style={customStyle}
                onClick={action}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                role="button"
                aria-hidden="true"
            >
                <div>
                    <div style={textStyle}>
                        {leftIcon && leftIcon}
                        <Text size={textSize} textStyle={styleText} {...props}>
                            {children}
                        </Text>
                        {rightIcon && rightIcon}
                    </div>
                    {!hideBorder && <div style={borderStyle} />}
                </div>
            </div>
        </>
    );
};

export default React.memo(InteractiveText);
