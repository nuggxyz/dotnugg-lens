import React, { FunctionComponent, useCallback, useMemo } from 'react';

import useOnHover from '../../../../hooks/useOnHover';
import AppState from '../../../../state/app';
import Text from '../../Texts/Text/Text';

import styles from './Button.styles';

export type ButtonProps = {
    onClick: any | (() => void);
    label?: string;
    buttonStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    rightIcon?: JSX.Element;
    leftIcon?: JSX.Element;
    hoverStyle?: React.CSSProperties;
    disabled?: boolean;
    isHovering?: (hover: boolean) => void;
};

const Button: FunctionComponent<ButtonProps> = ({
    onClick,
    label,
    buttonStyle,
    textStyle,
    rightIcon,
    leftIcon,
    disabled = false,
    isHovering,
    hoverStyle,
}) => {
    const [ref, hover] = useOnHover(isHovering);

    const style = useMemo(() => {
        return {
            ...styles.button,
            filter: hover ? 'brightness(.8)' : 'brightness(1)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...buttonStyle,
            ...(hover && hoverStyle),
        };
    }, [hover, disabled, buttonStyle, hoverStyle]);

    const RightIcon = useCallback(
        () => (rightIcon ? rightIcon : null),
        [rightIcon],
    );
    const LeftIcon = useCallback(
        () => (leftIcon ? leftIcon : null),
        [leftIcon],
    );
    const Label = useCallback(
        () =>
            label ? (
                <Text weight="bold" textStyle={{ ...textStyle }}>
                    {label}
                </Text>
            ) : null,
        [label, textStyle],
    );

    return (
        <div ref={ref} onClick={disabled ? undefined : onClick} style={style}>
            <LeftIcon />
            <Label />
            <RightIcon />
        </div>
    );
};

export default React.memo(Button);
