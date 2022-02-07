import React, { FunctionComponent, useState } from 'react';

import Button from '../components/general/Buttons/Button/Button';
import TextInput from '../components/general/TextInputs/TextInput/TextInput';
import Text from '../components/general/Texts/Text/Text';
import AppState from '../state/app';

type Props = {};

const Connect: FunctionComponent<Props> = () => {
    const [apiKey, setApiKey] = useState('');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Add your API Key</Text>
            <Text>By doing so, you agree with our terms and shit</Text>

            <TextInput
            
                setValue={setApiKey}
                value={apiKey}
                placeholder="e.g., a1b2c3d4e5..."
            />
            <Button
                label="Submit"
                onClick={() =>
                    AppState.dispatch.setApiKey({
                        _localStorageTarget: 'apiKey',
                        _localStorageExpectedType: 'unique',
                        _localStorageValue: apiKey,
                    })
                }
            />
        </div>
    );
};

export default Connect;
