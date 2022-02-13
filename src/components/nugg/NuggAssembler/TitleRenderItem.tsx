import React, { FunctionComponent } from 'react';

import Text from '../../general/Texts/Text/Text';

import styles from './NuggAssembler.styles';

type Props = { title: string };

const TitleRenderItem: FunctionComponent<Props> = ({ title }) => {
    return (
        <div style={styles.titleRenderItemContainer}>
            <Text textStyle={styles.titleRenderItemText} size="large">
                {title}
            </Text>
        </div>
    );
};

export default TitleRenderItem;
