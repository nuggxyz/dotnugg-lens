import React, { CSSProperties, FunctionComponent, useState } from 'react';

import NLStaticImage, { NLStaticImageKey } from '../../NLStaticImage';
import Button from '../Button/Button';

import styles from './IconButton.styles';

type Props = {
    icon: NLStaticImageKey;
    onClick: () => void;
    buttonStyle?: CSSProperties;
};

const IconButton: FunctionComponent<Props> = ({
    icon,
    onClick,
    buttonStyle,
}) => {
    const [hoverStyle, setHoverStyle] = useState(styles.hoverOff);

    const style = {
        ...styles.container,
        ...buttonStyle,
        ...hoverStyle,
    };
    const isHovering = (hover: boolean) => {
        setHoverStyle(hover ? styles.hoverOn : styles.hoverOff);
    };

    return (
        <Button
            rightIcon={<NLStaticImage image={icon} />}
            onClick={onClick}
            buttonStyle={style}
            isHovering={isHovering}
        />
    );
};

export default React.memo(IconButton);
