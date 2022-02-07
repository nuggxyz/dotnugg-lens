import { Web3Provider } from '@ethersproject/providers';

import { NetworkConnector } from './connectors/NetworkConnector';
import { isUndefinedOrNull, isUndefinedOrNullOrObjectEmpty } from './lib';
import store from './state/store';
import Web3Config from './Web3Config';

export default {
    NUGG_PROTOCOL: '0x42069',
    SALT: 'DUBNDAN',
    EPOCH_INTERVAL: 69,
    EPOCH_OFFSET: 3000,
};

export const NetworkContextName = 'NETWORK';

export const getProvider = (key?: string): Web3Provider => {
    try {
        let networkProvider = new NetworkConnector({
            urls: Web3Config.getUrls(key),
        }).provider;
        let library = new Web3Provider(networkProvider as any);
        library.pollingInterval = 1000;
        return library;
    } catch (e) {
        console.log('bitch', e);
        throw new Error(e);
    }
};
