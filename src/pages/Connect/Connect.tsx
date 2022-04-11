import React, { FunctionComponent, useState } from 'react';
import { BigNumber } from 'ethers';
import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';
import useEffect from 'react';

import Button from '../../components/general/Buttons/Button/Button';
import Loader from '../../components/general/Loader/Loader';
import TextInput from '../../components/general/TextInputs/TextInput/TextInput';
import Text from '../../components/general/Texts/Text/Text';
import { getProvider } from '../../config';
import { DotnuggV1Helper } from '../../contracts/DotnuggHelper';
import Colors from '../../lib/colors';
import globalStyles from '../../lib/globalStyles';
import AppState from '../../state/app';
import Web3Config from '../../Web3Config';

import styles from './Connect.styles';

type Props = {};

export const createInfuraProvider = (
    chain: string,
    key: string,
): JsonRpcProvider => {
    return new InfuraProvider(chain, key);
};

const Connect: FunctionComponent<Props> = () => {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        AppState.dispatch.setApiKey({
            _localStorageTarget: 'apiKey',
            _localStorageExpectedType: 'unique',
            _localStorageValue: Web3Config.INFURA_KEY,
        });
    }, []);

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
                setValue={(text) =>
                    setApiKey(
                        text === 'dotnugg'
                            ? Web3Config.INFURA_KEY
                            : Web3Config.INFURA_KEY,
                    )
                }
                value={apiKey}
                placeholder="e.g., a1b2c3d4e5..."
            />
            <Button
                label="Verify"
                buttonStyle={styles.button}
                onClick={async () => {
                    setLoading(true);
                    AppState.dispatch.setApiKey({
                        _localStorageTarget: 'apiKey',
                        _localStorageExpectedType: 'unique',
                        _localStorageValue: apiKey,
                    });
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
