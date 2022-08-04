import { Interface } from '@ethersproject/abi/lib/interface';
import { BigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { BlockTag, Formatter, Network } from '@ethersproject/providers';

import { toEth } from '@src/app/lib/conversion';
import nuggftabi from '@src/app/abis/NuggftV1.json';

export enum Chain {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
}
export const DEFAULT_CHAIN = Chain.GOERLI;

export function supportedChainIds() {
    // @ts-ignore
    return Object.values<Chain>(Chain);
}

export enum ConnectorEnum {
    WalletConnect = 'walletconnect',
    MetaMask = 'metamask',
    CoinbaseWallet = 'coinbasewallet',
    Rpc = 'rpc',
}

export const NETWORK_HEALTH_CHECK_MS = 15 * 1000;
export const DEFAULT_MS_BEFORE_WARNING = 90 * 1000;

export const INFURA_KEY = process.env.NUGG_APP_INFURA_KEY as string;
export const ALCHEMY_KEY = process.env.NUGG_APP_ALCHEMY_KEY as string;
export const ETHERSCAN_KEY = process.env.NUGG_APP_ETHERSCAN_KEY as string;

export const isValidChainId = (input: number) => {
    return supportedChainIds().indexOf(input) !== -1;
};

export const NuggftV1__Interface = () => new Interface(nuggftabi);

export const MIN_SALE_PRICE = toEth('.001');

export const FEATURE_NAMES = [
    'Base',
    'Eyes',
    'Mouth',
    'Hair',
    'Hat',
    'Back',
    'Hold',
    'Neck',
] as unknown as FixedLengthArray<string, 8>;

// chances any nugg will have get a given feature
export const FEATURE_RARITY = [8, 11, 11, 6, 6, 3, 3, 3].map(
    (x) => x / 8,
) as unknown as FixedLengthArray<number, 8>;
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000' as const;

export const CONTRACTS = {
    [Chain.MAINNET]: {
        NuggftV1: ADDRESS_ZERO,
        xNuggftV1: ADDRESS_ZERO,
        DotnuggV1: ADDRESS_ZERO,
        Genesis: 0,
        Interval: 0,
        Offset: 1,
        MintOffset: 1000000,
    },
    [Chain.ROPSTEN]: {
        NuggftV1: '0x69420000e30fb9095ec2a254765ff919609c1875',
        xNuggftV1: '0xd67f4462308e6c5c236b107e8d0b77da2c359cae',
        DotnuggV1: '0xb0ac4a039fd789fe080c8477d8e004b67fc987f1',
        Genesis: 12351104,
        Interval: 64,
        Offset: 1,
        MintOffset: 1000000,
    },
    [Chain.RINKEBY]: {
        NuggftV1: '0x6942000062516fab40349b13131c34346c0446e8',
        xNuggftV1: '0x12705e16c18e115b94a6ce6023e96ea328032edb',
        DotnuggV1: '0x6b11799eaaf5cd8799915c64e901c254207366ba',
        Genesis: 10840448,
        Interval: 64,
        Offset: 1,
        MintOffset: 1000000,
    },
    [Chain.GOERLI]: {
        NuggftV1: '0x694200000FdFBc056b59c498c60A7330255A9755',
        xNuggftV1: '0x2e37C9C29819F08016aec55F67942A5D8db8A407',
        DotnuggV1: '0x2e0e42DC7d15aDBb40C29b6fb4Fc42fA7AA8Ea5E',
        Genesis: 7342912,
        Interval: 64,
        Offset: 1,
        MintOffset: 1000000,
        PreMintTokens: 2000,
    },
    [Chain.KOVAN]: {
        NuggftV1: '0x694200002e1540157c5fe987705e418ee0a9577d',
        xNuggftV1: '0xf4b460f98345b404c9b0455a36f7676a49ad59ab',
        DotnuggV1: '0x632955df598472c37ef75d2111d450b935ec6abc',
        Genesis: 32140416,
        Interval: 64,
        Offset: 1,
        MintOffset: 1000000,
    },
} as const;

export const PROTOCOL_FEE_FRAC_MINT = 1;
export const PREMIUM_DIV = 2000;
export const DEFAULT_CONTRACTS = CONTRACTS[DEFAULT_CHAIN];

export const globalFormatter = new Formatter();

export const calculateStartBlock = (epoch: BigNumberish, chainId: Chain = DEFAULT_CHAIN) => {
    return BigNumber.from(epoch)
        .sub(CONTRACTS[chainId].Offset)
        .mul(CONTRACTS[chainId].Interval)
        .add(CONTRACTS[chainId].Genesis)
        .toNumber();
};

export const calculateEpochId = (blocknum: number, chainId: Chain = DEFAULT_CHAIN) => {
    if (!CONTRACTS[chainId].Interval) return 0;
    return BigNumber.from(blocknum)
        .sub(CONTRACTS[chainId].Genesis)
        .div(CONTRACTS[chainId].Interval)
        .add(CONTRACTS[chainId].Offset)
        .toNumber();
};

export const calculateRawOfferValue = (buyingNugg: NuggId, sellingNugg: NuggId, itemId: ItemId) => {
    const abc = BigNumber.from(buyingNugg.toRawId())
        .shl(40)
        .or(BigNumber.from(itemId.toRawId()).shl(24))
        .or(sellingNugg.toRawId());
    return abc;
};

export const calculateEndBlock = (epoch: number, chainId: Chain = DEFAULT_CHAIN) => {
    return calculateStartBlock(epoch + 1, chainId) - 1;
};

export const CHAIN_LABEL = {
    [Chain.MAINNET]: `mainnet`,
    [Chain.RINKEBY]: `rinkeby`,
    [Chain.ROPSTEN]: `ropsten`,
    [Chain.GOERLI]: `goerli`,
    [Chain.KOVAN]: `kovan`,
} as const;

const buildGraphHttpUrl = <T extends Chain>(chain: T) => {
    return `https://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-${CHAIN_LABEL[chain]}` as const;
};

const buildGraphWssUrl = <T extends Chain>(chain: T) => {
    return `wss://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-${CHAIN_LABEL[chain]}` as const;
};

export const GRAPH_ENPOINTS = {
    [Chain.MAINNET]: buildGraphHttpUrl(Chain.MAINNET),
    [Chain.RINKEBY]: buildGraphHttpUrl(Chain.RINKEBY),
    [Chain.ROPSTEN]: buildGraphHttpUrl(Chain.ROPSTEN),
    [Chain.GOERLI]: buildGraphHttpUrl(Chain.GOERLI),
    [Chain.KOVAN]: buildGraphHttpUrl(Chain.KOVAN),
};

export const GRAPH_WSS_ENDPOINTS = {
    [Chain.MAINNET]: buildGraphWssUrl(Chain.MAINNET),
    [Chain.RINKEBY]: buildGraphWssUrl(Chain.RINKEBY),
    [Chain.ROPSTEN]: buildGraphWssUrl(Chain.ROPSTEN),
    [Chain.GOERLI]: buildGraphWssUrl(Chain.GOERLI),
    [Chain.KOVAN]: buildGraphWssUrl(Chain.KOVAN),
};

export const INFURA_URLS = {
    [Chain.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [Chain.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
    [Chain.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
    [Chain.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [Chain.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
};

export const ALCHEMY_URLS = {
    [Chain.MAINNET]: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.RINKEBY]: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.ROPSTEN]: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.GOERLI]: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.KOVAN]: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KEY}`,
};

export const INFURA_WSS_URLS = {
    [Chain.MAINNET]: `wss://mainnet.infura.io/v3/${INFURA_KEY}`,
    [Chain.RINKEBY]: `wss://rinkeby.infura.io/v3/${INFURA_KEY}`,
    [Chain.ROPSTEN]: `wss://ropsten.infura.io/v3/${INFURA_KEY}`,
    [Chain.GOERLI]: `wss://goerli.infura.io/v3/${INFURA_KEY}`,
    [Chain.KOVAN]: `wss://kovan.infura.io/v3/${INFURA_KEY}`,
};

export const ALCHEMY_WSS_URLS = {
    [Chain.MAINNET]: `wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.RINKEBY]: `wss://eth-rinkeby.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.ROPSTEN]: `wss://eth-ropsten.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.GOERLI]: `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    [Chain.KOVAN]: `wss://eth-kovan.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`,
};

export const CHAIN_INFO = {
    [Chain.MAINNET]: {
        explorer: 'https://etherscan.io/',
        name: 'Ethereum',
        label: 'mainnet',
        etherscanApiHost: 'api.etherscan.io',
    },
    [Chain.RINKEBY]: {
        explorer: 'https://rinkeby.etherscan.io/',
        name: 'Rinkeby',
        label: 'rinkeby',
        etherscanApiHost: 'api-rinkeby.etherscan.io',
    },
    [Chain.ROPSTEN]: {
        explorer: 'https://ropsten.etherscan.io/',
        name: 'Ropsten',
        label: 'ropsten',
        etherscanApiHost: 'api-ropsten.etherscan.io',
    },
    [Chain.GOERLI]: {
        explorer: 'https://goerli.etherscan.io/',
        name: 'Görli',
        label: 'goerli',
        etherscanApiHost: 'api-goerli.etherscan.io',
    },
    [Chain.KOVAN]: {
        explorer: 'https://kovan.etherscan.io/',
        name: 'Kovan',
        label: 'kovan',
        etherscanApiHost: 'api-kovan.etherscan.io',
    },
} as const;

export const ENS_REGISTRAR_ADDRESSES = {
    [Chain.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [Chain.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [Chain.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [Chain.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [Chain.KOVAN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
};

export const getNetwork = (chainId: Chain): Network => ({
    name: CHAIN_LABEL[chainId],
    chainId,
    ensAddress: ENS_REGISTRAR_ADDRESSES[chainId],
});

export const getCustomEtherPrice = async () => {
    try {
        const resonse = await fetch(
            `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_KEY}`,
        );

        if (resonse.ok) {
            const { result } = (await resonse.json()) as {
                status: string;
                message: string;
                result: {
                    ethbtc: string;
                    ethbtc_timestamp: string;
                    ethusd: string;
                    ethusd_timestamp: string;
                };
            };

            return {
                ethusd: parseFloat(result.ethusd),
                ethusd_timestamp: Number(result.ethusd_timestamp),
            };
        }
        return {
            ethusd: null,
            ethusd_timestamp: null,
        };
    } catch (err) {
        return {
            ethusd: null,
            ethusd_timestamp: null,
        };
    }
};

interface EtherscanTransactionResponse {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    creates: string;
    confirmations: string;
    errorCode: string;
}

export const fetchEtherscanTransactionHistory = async (
    address: AddressString,
    startBlock?: BlockTag,
    endBlock?: BlockTag,
): Promise<Array<EtherscanTransactionResponse>> => {
    // Note: The `page` page parameter only allows pagination within the
    //       10,000 window available without a page and offset parameter
    //       Error: Result window is too large, PageNo x Offset size must
    //              be less than or equal to 10000

    // const params = {
    //     action: 'txlist',
    //     address,
    //     startblock: startBlock == null ? 0 : startBlock,
    //     endblock: endBlock == null ? 99999999 : endBlock,
    //     sort: 'asc',
    // };
    try {
        const request = await fetch(
            `https://${
                CHAIN_INFO[DEFAULT_CHAIN].etherscanApiHost
            }/api?module=account&action=txlist&address=${address}&startblock=${
                startBlock ?? 0
            }&endblock=${endBlock ?? '99999999'}&sort=asc&apikey=${ETHERSCAN_KEY}`,
        );

        if (request.ok) {
            const { result } = (await request.json()) as {
                status: string;
                message: string;
                result: EtherscanTransactionResponse[];
            };

            return result;
        }
        throw new Error();
    } catch (err) {
        return [];
    }

    // // const result = (await this.fetch('account', params)) as Array<EtherscanTransactionResponse>;

    // return result.map((tx) => {
    //     ['contractAddress' as const, 'to' as const].forEach(function (key) {
    //         if (tx[key] === '') {
    //             delete tx[key];
    //         }
    //     });
    //     if (tx.creates == null && tx.contractAddress != null) {
    //         tx.creates = tx.contractAddress;
    //     }
    //     const item = this.formatter.transactionResponse(tx);

    //     Object.assign(item, {
    //         isError: Number(tx.isError) === 1,
    //         errorCode: tx.errorCode ?? null,
    //     });

    //     if (tx.timeStamp) {
    //         item.timestamp = parseInt(tx.timeStamp, 10);
    //     }

    //     return item as typeof item & { isError: boolean; errorCode: string | null };
    // });
};
