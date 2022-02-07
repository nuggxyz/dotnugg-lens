import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';

import store from './state/store';
import { NetworkConnector } from './connectors/NetworkConnector';

export enum SupportedChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
}

export default class Web3Config {
    static SupportedChainId = SupportedChainId;
    static get supportedChainIds() {
        // @ts-ignore
        return Object.values<number>(SupportedChainId);
    }

    static DEFAULT_CHAIN = 5;

    static NETWORK_HEALTH_CHECK_MS = 15 * 1000;
    static DEFAULT_MS_BEFORE_WARNING = 90 * 1000;

    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static CONTRACTS = {
        [Web3Config.SupportedChainId.MAINNET]: {
            NuggftV1: ethers.constants.AddressZero,
            DotnuggV1: ethers.constants.AddressZero,
        },
        [Web3Config.SupportedChainId.ROPSTEN]: {
            NuggftV1: '0x420690c1b1519a32fa36768dc2cefe128160a9b7',
            DotnuggV1: '0x420690542c8DeDDe5aF93684897CE3CA7422FE57',
        },
        [Web3Config.SupportedChainId.RINKEBY]: {
            NuggftV1: '0x47f7100Fd49A162A08D000202eb68145Aa9CeBaC',
            DotnuggV1: '0x6039df117f2d6e805d90114809ca3769a2f50ddb',
        },
        [Web3Config.SupportedChainId.GOERLI]: {
            NuggftV1: '0x4d15f454d1edb04ff8ceea618a655e4b309822f8',
            DotnuggV1: '0xa3490501fdd354f3b121d7b8b639508bfaf2a869',
        },
    };

    static get activeChain__NuggftV1() {
        return this.CONTRACTS[Web3Config.DEFAULT_CHAIN].NuggftV1;
    }

    static get activeChain__GraphEndpoint() {
        return this.GRAPH_ENPOINTS[Web3Config.DEFAULT_CHAIN];
    }

    static get activeChain__DotnuggV1() {
        return this.CONTRACTS[Web3Config.DEFAULT_CHAIN].DotnuggV1;
    }

    static get activeChain__EnsRegistrar() {
        return this.ENS_REGISTRAR_ADDRESSES[Web3Config.DEFAULT_CHAIN];
    }

    static GRAPH_ENPOINTS = {
        [Web3Config.SupportedChainId
            .MAINNET]: `https://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-mainnet`,
        [Web3Config.SupportedChainId
            .RINKEBY]: `https://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-rinkeby`,
        [Web3Config.SupportedChainId
            .ROPSTEN]: `https://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-ropsten`,
        [Web3Config.SupportedChainId
            .GOERLI]: `https://api.thegraph.com/subgraphs/name/nuggxyz/nuggftv1-goerli`,
    };

    static NETWORK_URLS = {
        [Web3Config.SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${
            store.getState().app.apiKey === 'dotnugg'
                ? Web3Config.INFURA_KEY
                : store.getState().app.apiKey
        }`,
        [Web3Config.SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${
            store.getState().app.apiKey === 'dotnugg'
                ? Web3Config.INFURA_KEY
                : store.getState().app.apiKey
        }`,
        [Web3Config.SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${
            store.getState().app.apiKey === 'dotnugg'
                ? Web3Config.INFURA_KEY
                : store.getState().app.apiKey
        }`,
        [Web3Config.SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${
            store.getState().app.apiKey === 'dotnugg'
                ? Web3Config.INFURA_KEY
                : Web3Config.INFURA_KEY //store.getState().app.apiKey
        }`,
        // [Web3Config.SupportedChainId
        //     .KOVAN]: `https://kovan.infura.io/v3/${Web3Config.INFURA_KEY}`,
    };

    static connectors = {
        network: new NetworkConnector({
            urls: Web3Config.NETWORK_URLS,
            defaultChainId: Web3Config.DEFAULT_CHAIN,
        }),
        injected: new InjectedConnector({
            supportedChainIds: Web3Config.supportedChainIds,
        }),
        walletconnect: new WalletConnectConnector({
            supportedChainIds: Web3Config.supportedChainIds,
            rpc: Web3Config.NETWORK_URLS,
            qrcode: true,
        }),
    };
    static SUPPORTED_WALLETS = {
        METAMASK: {
            connector: Web3Config.connectors.injected,
            name: 'MetaMask',
            iconURL: 'metamask',
            description: 'Easy-to-use browser extension.',
            href: null,
            color: '#E8831D',
        },
        WALLET_CONNECT: {
            connector: Web3Config.connectors.walletconnect,
            name: 'WalletConnect',
            iconURL: 'walletConnect',
            description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
            href: null,
            color: '#4196FC',
            mobile: true,
        },
    };

    static CHAIN_INFO = {
        [SupportedChainId.MAINNET]: {
            docs: 'https://docs.uniswap.org/',
            explorer: 'https://etherscan.io/',
            infoLink: 'https://info.uniswap.org/#/',
            label: 'Ethereum',
            logoUrl: 'assets/images/ethereum-logo.png',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        },
        [SupportedChainId.RINKEBY]: {
            docs: 'https://docs.uniswap.org/',
            explorer: 'https://rinkeby.etherscan.io/',
            infoLink: 'https://info.uniswap.org/#/',
            label: 'Rinkeby',
            nativeCurrency: {
                name: 'Rinkeby ETH',
                symbol: 'rinkETH',
                decimals: 18,
            },
        },
        [SupportedChainId.ROPSTEN]: {
            docs: 'https://docs.uniswap.org/',
            explorer: 'https://ropsten.etherscan.io/',
            infoLink: 'https://info.uniswap.org/#/',
            label: 'Ropsten',
            nativeCurrency: {
                name: 'Ropsten ETH',
                symbol: 'ropETH',
                decimals: 18,
            },
        },
        // [SupportedChainId.KOVAN]: {
        //     docs: 'https://docs.uniswap.org/',
        //     explorer: 'https://kovan.etherscan.io/',
        //     infoLink: 'https://info.uniswap.org/#/',
        //     label: 'Kovan',
        //     nativeCurrency: {
        //         name: 'Kovan ETH',
        //         symbol: 'kovETH',
        //         decimals: 18,
        //     },
        // },
        [SupportedChainId.GOERLI]: {
            docs: 'https://docs.uniswap.org/',
            explorer: 'https://goerli.etherscan.io/',
            infoLink: 'https://info.uniswap.org/#/',
            label: 'Görli',
            nativeCurrency: {
                name: 'Görli ETH',
                symbol: 'görETH',
                decimals: 18,
            },
        },
    };

    static ENS_REGISTRAR_ADDRESSES = {
        [Web3Config.SupportedChainId.MAINNET]:
            '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        [Web3Config.SupportedChainId.ROPSTEN]:
            '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        [Web3Config.SupportedChainId.GOERLI]:
            '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        [Web3Config.SupportedChainId.RINKEBY]:
            '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    };
}
