import Web3Config from '../Web3Config';

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
    [Web3Config.SupportedChainId.MAINNET]: '',
    [Web3Config.SupportedChainId.ROPSTEN]: 'ropsten.',
    [Web3Config.SupportedChainId.RINKEBY]: 'rinkeby.',
    [Web3Config.SupportedChainId.GOERLI]: 'goerli.',
    [Web3Config.SupportedChainId.KOVAN]: 'kovan.',
};

export enum ExplorerDataType {
    TRANSACTION = 'transaction',
    TOKEN = 'token',
    ADDRESS = 'address',
    BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(
    chainId: number,
    data: string,
    type: ExplorerDataType,
): string {
    // if (chainId === Web3Config.SupportedChainId.ARBITRUM_KOVAN) {
    //     switch (type) {
    //         case ExplorerDataType.TRANSACTION:
    //             return `https://explorer5.arbitrum.io/#/tx/${data}`;
    //         case ExplorerDataType.ADDRESS:
    //             return `https://explorer5.arbitrum.io/#/address/${data}`;
    //         case ExplorerDataType.BLOCK:
    //             return `https://explorer5.arbitrum.io/#/block/${data}`;
    //         default:
    //             return `https://explorer5.arbitrum.io`;
    //     }
    // }

    // if (chainId === Web3Config.SupportedChainId.ARBITRUM_ONE) {
    //     switch (type) {
    //         case ExplorerDataType.TRANSACTION:
    //             return `https://mainnet-arb-explorer.netlify.app/tx/${data}`;
    //         case ExplorerDataType.ADDRESS:
    //             return `https://mainnet-arb-explorer.netlify.app/address/${data}`;
    //         case ExplorerDataType.BLOCK:
    //             return `https://mainnet-arb-explorer.netlify.app/block/${data}`;
    //         default:
    //             return `https://mainnet-arb-explorer.netlify.app`;
    //     }
    // }

    const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}etherscan.io`;

    switch (type) {
        case ExplorerDataType.TRANSACTION:
            return `${prefix}/tx/${data}`;

        case ExplorerDataType.TOKEN:
            return `${prefix}/token/${data}`;

        case ExplorerDataType.BLOCK:
            return `${prefix}/block/${data}`;

        case ExplorerDataType.ADDRESS:
            return `${prefix}/address/${data}`;
        default:
            return `${prefix}`;
    }
}
