import React, { FunctionComponent, useState } from 'react';

import Button from '../components/general/Buttons/Button/Button';
import Loader from '../components/general/Loader/Loader';
import TextInput from '../components/general/TextInputs/TextInput/TextInput';
import Text from '../components/general/Texts/Text/Text';
import { getProvider } from '../config';
import { DotnuggV1Helper } from '../contracts/DotnuggHelper';
import Colors from '../lib/colors';
import AppState from '../state/app';

type Props = {};

const Connect: FunctionComponent<Props> = () => {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
            <Text type="title">Add your API Key</Text>
            <Text>By doing so, you agree with our terms and shit</Text>

            <TextInput
                style={{
                    width: '20%',
                    background: Colors.transparentLightGrey,
                    padding: '1rem',
                }}
                setValue={setApiKey}
                value={apiKey}
                placeholder="e.g., a1b2c3d4e5..."
            />
            <Button
                label="Submit"
                onClick={async () => {
                    setLoading(true);
                    DotnuggV1Helper.instance
                        .connect(getProvider(apiKey))
                        .template()
                        .then(() =>
                            AppState.dispatch.setApiKey({
                                _localStorageTarget: 'apiKey',
                                _localStorageExpectedType: 'unique',
                                _localStorageValue: apiKey,
                            }),
                        )
                        .catch(() => alert('Incorrect Key'))
                        .finally(() => setLoading(false));
                }}
                rightIcon={loading && <Loader />}
            />
        </div>
    );
};

export default Connect;
