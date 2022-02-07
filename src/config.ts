import { Web3Provider } from '@ethersproject/providers';

import { isUndefinedOrNull, isUndefinedOrNullOrObjectEmpty } from './lib';
import Web3Config from './Web3Config';

export default {
    // NUGGFT: '0x463932D1416c4006a6790BA5E3B4757e3D2e6259',
    // DOTNUGG_RESOLVER: '0xF7895Bc8A3C3A8B91D834b888a6BdEaE4a2fb098',
    // ENS: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    NUGG_PROTOCOL: '0x42069',
    SALT: 'DUBNDAN',
    EPOCH_INTERVAL: 69,
    EPOCH_OFFSET: 3000,
};

export const NetworkContextName = 'NETWORK';

export const getProvider = (provider?: any): Web3Provider => {
    let library: Web3Provider;
    if (isUndefinedOrNullOrObjectEmpty(provider)) {
        let networkProvider = Web3Config.connectors.network.provider;
        library = new Web3Provider(
            networkProvider as any,
            !isUndefinedOrNull(networkProvider.chainId)
                ? +networkProvider.chainId
                : 'any',
        );
    } else {
        library = new Web3Provider(
            provider as any,
            !isUndefinedOrNull(provider.chainId) ? +provider.chainId : 'any',
        );
    }
    library.pollingInterval = 1000;
    return library;
};
