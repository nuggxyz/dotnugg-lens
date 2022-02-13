import React, { FunctionComponent, useState } from 'react';

import Button from '../../components/general/Buttons/Button/Button';
import Loader from '../../components/general/Loader/Loader';
import TextInput from '../../components/general/TextInputs/TextInput/TextInput';
import Text from '../../components/general/Texts/Text/Text';
import { getProvider } from '../../config';
import { DotnuggV1Helper } from '../../contracts/DotnuggHelper';
import Colors from '../../lib/colors';
import globalStyles from '../../lib/globalStyles';
import AppState from '../../state/app';

import styles from './Connect.styles';

type Props = {};

const Connect: FunctionComponent<Props> = () => {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div style={styles.container}>
            <Text type="title" textStyle={styles.titleText} size="large">
                Add your Infura Project ID
            </Text>
            <Text type="text" size="smaller" textStyle={styles.text}>
                By adding your Infura Project ID, you agree to nugg.xyz's Terms
                of Service and acknowledge that you have read and understood the
                nugg.xyz Protocol Disclaimer.
            </Text>

            <TextInput
                styleInputContainer={globalStyles.fillWidth}
                styleInput={styles.textInput}
                setValue={setApiKey}
                value={apiKey}
                placeholder="e.g., a1b2c3d4e5..."
            />
            <Button
                label="Verify"
                buttonStyle={styles.button}
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
                rightIcon={
                    loading && (
                        <div style={styles.loader}>
                            <Loader color={Colors.nuggRedText} />
                        </div>
                    )
                }
            />
        </div>
    );
};

export default Connect;
