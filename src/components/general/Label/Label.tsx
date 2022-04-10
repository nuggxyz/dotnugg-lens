import React, { FunctionComponent } from 'react';

import Text, { TextProps } from '../Texts/Text/Text';

import styles from './Label.styles';

type Props = {
    basic?: boolean;
    text: string;
    containerStyles?: React.CSSProperties;
} & Partial<TextProps>;

const Label: FunctionComponent<Props> = ({
    basic = false,
    text,
    containerStyles = {},
    ...props
}) => {
    return (
        <div
            style={{
                ...styles.container,
                ...(basic ? styles.basic : {}),
                ...containerStyles,
            }}>
            <Text textStyle={styles.text} {...props}>
                {text}
            </Text>
        </div>
    );
};

export default React.memo(Label);
