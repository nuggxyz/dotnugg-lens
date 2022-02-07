/** @format */

import React, { CSSProperties, FunctionComponent, useState } from 'react';

import Image from '../../Images/Image/Image';
import Button from '../Button/Button';

import styles from './IconButton.styles';

type Props = {
    icon: string;
    onClick: () => void;
    buttonStyle?: CSSProperties;
};

const IconButton: FunctionComponent<Props> = ({
    icon,
    onClick,
    buttonStyle,
}) => {
    const style = {
        ...styles.container,
        ...buttonStyle,
    };

    const [hoverStyle, setHoverStyle] = useState(styles.hoverOff);

    const isHovering = (hover: boolean) =>
        setHoverStyle(hover ? styles.hoverOn : styles.hoverOff);

    return (
        <Button
            rightIcon={<Image src={icon} style={hoverStyle} />}
            onClick={onClick}
            buttonStyle={style}
            isHovering={isHovering}
        />
    );
};

export default React.memo(IconButton);
