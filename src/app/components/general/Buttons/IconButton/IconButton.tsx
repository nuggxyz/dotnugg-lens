/** @format */

import React, { CSSProperties, FunctionComponent, useState } from 'react';

import Image from '@src/app/components/general/Images/Image/Image';
import Button from '@src/app/components/general/Buttons/Button/Button';

import styles from './IconButton.styles';

type Props = {
    icon?: string;
    onClick: () => void;
    buttonStyle?: CSSProperties;
    iconComponent?: JSX.Element;
    className?: string;
};

const IconButton: FunctionComponent<Props> = ({
    icon,
    onClick,
    buttonStyle,
    iconComponent: Comp,
    className,
}) => {
    const style = {
        ...styles.container,
        ...buttonStyle,
    };

    const [hoverStyle, setHoverStyle] = useState(styles.hoverOff);

    const isHovering = (hover: boolean) => setHoverStyle(hover ? styles.hoverOn : styles.hoverOff);

    return (
        <Button
            className={className}
            rightIcon={icon ? <Image src={icon} style={hoverStyle} /> : Comp || undefined}
            onClick={onClick}
            buttonStyle={style}
            isHovering={isHovering}
        />
    );
};

export default IconButton;
