import React, { FunctionComponent } from 'react';

import Layout from '../../lib/layout';
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
                    window.dotnugg.openLink(
                        'https://github.com/nuggxyz/nuggft-art/releases/tag/v0.0.1',
                    )
                }>
                ours
            </InteractiveText>
        </Text>
    );
};

export default UseOurs;
