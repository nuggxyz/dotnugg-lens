import React, { FunctionComponent } from 'react';

import InteractiveText from '@src/app/components/general/Texts/InteractiveText/InteractiveText';
import Text from '@src/app/components/general/Texts/Text/Text';
import lib from '@src/app/lib';
import client from '@src/app/client/index';

const UseOurs: FunctionComponent<unknown> = () => {
    const updateArtDir = client.compiled.useUpdateArtDir();
    return (
        <Text
            textStyle={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
            }}
            type="text"
        >
            or use
            <InteractiveText
                type="text"
                style={{ marginLeft: '.3rem', marginTop: '.37rem' }}
                styleText={{ fontFamily: lib.layout.fontFamily.rounded }}
                action={() => updateArtDir('')}
            >
                ours
            </InteractiveText>
        </Text>
    );
};

export default UseOurs;
