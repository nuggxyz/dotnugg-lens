import React, { FunctionComponent, useState } from 'react';
import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import Loader from '@src/components/general/Loader/Loader';
import Text from '@src/components/general/Texts/Text/Text';
import globalStyles from '@src/lib/globalStyles';
import Button from '@src/components/general/Buttons/Button/Button';
import TextInput from '@src/components/general/TextInputs/TextInput/TextInput';
import web3 from '@src/web3';
import client from '@src/client';
import lib from '@src/lib';

import styles from './Connect.styles';

export const createInfuraProvider = (chain: string, key: string): JsonRpcProvider => {
    return new InfuraProvider(chain, key);
};

const Connect: FunctionComponent<unknown> = () => {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);

    const updateInfuraKey = client.keys.useUpdateInfuraKey();

    return (
        <div style={styles.container}>
            <Text type="title" textStyle={styles.titleText} size="large">
                Add your Infura Project ID
            </Text>
            <Text type="text" size="smaller" textStyle={styles.text}>
                By adding your Infura Project ID, you agree to {`nugg.xyz's`} Terms of Service and
                acknowledge that you have read and understood the nugg.xyz Protocol Disclaimer.
            </Text>

            <TextInput
                styleInputContainer={globalStyles.fillWidth}
                styleInput={styles.textInput}
                setValue={(text: string) =>
                    setApiKey(text === 'dotnugg' ? web3.constants.INFURA_KEY : text)
                }
                value={apiKey}
                placeholder="e.g., a1b2c3d4e5..."
            />
            <Button
                label="Verify"
                buttonStyle={styles.button}
                onClick={() => {
                    setLoading(true);
                    updateInfuraKey(apiKey);
                    // DotnuggV1Helper.instance
                    //     .connect(createInfuraProvider('rinkeby', apiKey))
                    //     ['combo(uint256[],bool)'](
                    //         [
                    //             BigNumber.from(
                    //                 '0x0ec47003f13c3711c01490ac520400c80042403284b2807281',
                    //             ),

                    //             ,
                    //             BigNumber.from(
                    //                 '0x14913ca05c80457281f20170fc9a0c15c86877fdb242ef38e582884e42069001',
                    //             ),
                    //         ],
                    //         true,
                    //     )
                    //     .then(() =>

                    //     )
                    //     .catch((x) => {
                    //         alert('Incorrect Key');
                    //         console.log(x);
                    //     })
                    //     .finally(() => setLoading(false));
                }}
                rightIcon={
                    loading ? (
                        <div style={styles.loader}>
                            <Loader color={lib.colors.nuggRedText} />
                        </div>
                    ) : undefined
                }
            />
        </div>
    );
};

export default Connect;
