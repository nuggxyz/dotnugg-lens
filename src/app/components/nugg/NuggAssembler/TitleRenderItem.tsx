import React, { FunctionComponent } from 'react';

import web3 from '@src/app/web3';
import { isUndefinedOrNullOrNotNumber } from '@src/app/lib';
import Text from '@src/app/components/general/Texts/Text/Text';

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
