import React, { FunctionComponent } from 'react';

import Layout from '../../lib/layout';
import AppState from '../../state/app';
import InteractiveText from '../general/Texts/InteractiveText/InteractiveText';
import Text from '../general/Texts/Text/Text';

type Props = {};

const UseOurs: FunctionComponent<Props> = () => {
    return (
        <Text
            textStyle={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
            }}
            type="text">
            or use
            <InteractiveText
                type="text"
                style={{ marginLeft: '.3rem', marginTop: '.37rem' }}
                styleText={{ fontFamily: Layout.font.inter.bold }}
                action={() =>
                    AppState.dispatch.setArtLocation({
                        _localStorageValue: '',
                        _localStorageTarget: 'artLocation',
                        _localStorageExpectedType: 'unique',
                    })
                }>
                ours
            </InteractiveText>
        </Text>
    );
};

export default UseOurs;
