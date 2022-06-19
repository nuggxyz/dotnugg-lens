import React, { FunctionComponent } from 'react';

import web3 from '@src/web3';
import { isUndefinedOrNullOrNotNumber } from '@src/lib';
import Text from '@src/components/general/Texts/Text/Text';

import styles from './NuggAssembler.styles';

type Props = { title: string };

const TitleRenderItem: FunctionComponent<Props> = ({ title }) => {
    return (
        <div style={styles.titleRenderItemContainer}>
            <Text textStyle={styles.titleRenderItemText} size="large">
                {!isUndefinedOrNullOrNotNumber(+title)
                    ? web3.constants.FEATURE_NAMES[+title]
                    : title}
            </Text>
        </div>
    );
};

export default TitleRenderItem;
