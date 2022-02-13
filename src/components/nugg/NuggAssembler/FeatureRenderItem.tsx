import React, { FunctionComponent } from 'react';

import Colors from '../../../lib/colors';
import Button from '../../general/Buttons/Button/Button';
import Text from '../../general/Texts/Text/Text';

import styles from './NuggAssembler.styles';

type Props = {
    feature: string;
    onClick: () => void;
    isSelected: boolean;
    numberOfItems: number;
};

const FeatureRenderItem: FunctionComponent<Props> = ({
    feature,
    onClick,
    isSelected,
    numberOfItems,
}) => {
    return (
        <Button
            label={feature}
            textStyle={{
                color: isSelected ? Colors.nuggRedText : 'white',
            }}
            buttonStyle={{
                ...styles.featureRenderItemContainer,
                background: 'transparent' //!isSelected
                    // ? 'transparent'
                    // : Colors.transparentWhite,
            }}
            onClick={onClick}
            rightIcon={
                <Text
                    type="text"
                    size="small"
                    textStyle={styles.featureRenderItemBadge}>
                    {numberOfItems}
                </Text>
            }
        />
    );
};

export default FeatureRenderItem;
