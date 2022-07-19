/// <reference types="node" />
/// <reference types="react-dom" />
/// <reference types="react/next" />

declare type PickId<T extends TokenId> = T extends `${infer R}-${number}` ? R : never;

declare type Base64EncodedSvg = `data:image/svg+xml;base64,${string}`;

declare const __DEV__: boolean;

declare type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

declare type Maybe<T> = T | null;
declare type MaybeUndefinedOrNull<T> = T | null | undefined;

declare type InputMaybe<T> = Maybe<T>;
declare type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};

declare type MakeNullableInput<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: MaybeUndefinedOrNull<T[SubKey]>;
};

declare type AddressStringZero = '0x0000000000000000000000000000000000000000';

declare type Hex = `0x${
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'}`;

declare type AddressString = `0x${string}`;
declare type Hash = `0x${string}`;
declare type GetBetterWalletConnect = `unknown-${string}`;
declare type ResponseHash = Hash | GetBetterWalletConnect;

// const atMost32 = <T extends string>(str: TruncateTo32<T>) => str;

// declare interface WebSocketProvider extends import('@ethersproject/providers').WebSocketProvider {
//     _websocket: Websocket;
// }

// declare module '@ethersproject/providers' {
//     export interface WebSocketProvider
//         extends import('@ethersproject/providers').WebSocketProvider {
//         _websocket: WebSocket;
//     }
// }

// declare namespace React {
//     type UnsafeDependencyList = any[];

//     // function useCallback<T extends (...args: any[]) => unknown>(
//     //     callback: T,
//     //     deps: DependencyList,
//     // ): T;

//     type DependencyList = unknown[];
// }

declare module '@metamask/jazzicon' {
    export default function (diameter: number, seed: number): HTMLElement;
}

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    // import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    const content: React.ReactSVG;
    export default content;
}

interface Window {
    dotnugg: {
        createCompiler: (paths: string, address: string, apiKey: string) => void;
        on: (eventName: string, callback: (_?: any, _?: any, _?: any) => void) => void;
        send: (eventName: string) => void;
        openTo: (path: string, application?: string) => void;
        openToVSCode: (path: string) => void;
        clearCache: (path: string) => void;
        openLink: (url: string) => void;
        selectFiles: () => void;
        convertAseprite: (sourcePath: string, destPath: string, id: string, layer?: string) => void;
        checkOs: () => NL.Redux.App.OS;
        listLayers: (path: string) => void;
        getHex: (
            item: import('../archive/state/ipcListeners').Item['items'][number],
            path: string,
        ) => import('ethers').BigNumber[];
        getLiveHex: (
            item: import('../archive/state/ipcListeners').Item['items'][number],
            path: string,
        ) => import('ethers').BigNumber[];
        getLensDefault: () => string;
    };
    ethereum?: {
        isMetaMask?: boolean;

        on?: (...args: any[]) => void;
        removeListener?: (...args: any[]) => void;
        autoRefreshOnNetworkChange?: boolean;
        enable?: () => void;
        request?: (...args: any[]) => Promise<any>;
        _state?: {
            initialized: boolean;
            isConnected: boolean;
            isUnlocked: boolean;
            isPermanentlyDisconnected: boolean;
            accounts: string[];
        };
        providers: {
            isMetaMask?: boolean;
            isCoinbaseWallet?: boolean;
            isCoinbaseBrowser?: boolean;
        }[];
        selectedProvider?: {
            selectedAddress: string;
        };
        selectedAddress?: string;
    };
    web3?: Record<string, unknown>;
    __APOLLO_CLIENT__?: any;
}

type Entities = Splitter<NuggId, ItemId>;

declare type Wrap<A, B> = { [S in A]: B<S> }[A];

declare type TokenTypeWrapper<A> = Wrap<A, B>;

// type _SezViewSettingUnion<S extends TokenType> = S extends any ? SezViewSettings<S> : never;

// type SezViewSettingUnion = _SezViewSettingUnion<TokenType>;

declare function FIXX<K extends TokenType>(): TokenId extends infer R
    ? R extends K
        ? number
        : never
    : never;

declare type CusotomID = `${string}`;

interface String extends tokenId {
    isHash: () => this is Hash;
    isItemId: () => this is ItemId;
    isNuggId(): this is NuggId;
    toItemId(): ItemId;
    toNuggId(): NuggId;
    onlyTokenId: typeof EnsureIdFixture;
    onlyItemId(): ItemId | undefined;
    onlyNuggId(): NuggId | undefined;
    toRawId(): [typeof this] extends [TokenId] ? string : never;
    toRawIdNum(): [typeof this] extends [TokenId] ? number : never;
    toPrettyId(): [typeof this] extends [TokenId] ? string : never;
    // toIdNumber(): this extends `${}` ? number : null;
    // toIdNumber(): this extends TokenId ? number : never;
    isTokenId: typeof IsIdFixture;
    toTokenId: typeof IdFixture;
    equals(other: string): boolean;
}
interface Number {
    toItemId(): ItemId;
    toNuggId(): NuggId;
    toItemFeature(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    toItemPosition(): number;
    toTokenId: typeof IdFixture;
    isTokenId: typeof IsIdFixture;

    equals(other: string): boolean;
}
interface SVGGraphicsElement {
    getBBox: () => DOMRect;
}

interface Array<T> {
    shuffle();
    filterInPlace(callbackfn: (value: T, index?: number, array?: this) => boolean, thisArg?: this);
    merge(
        incomingData: Array<T>,
        keyField: keyof T,
        shouldOverride: (a: T, b: T) => boolean,
        sort?: (a: T, b: T) => number,
    ): Array<T>;
    mergeInPlace(
        incomingData: Array<T>,
        keyField: keyof T,
        shouldOverride: (a: T, b: T) => boolean,
        sort?: (a: T, b: T) => number,
    );
    mergeInPlaceReturnRef(
        incomingData: Array<T>,
        keyField: keyof T,
        shouldOverride: (a: T, b: T) => boolean,
        sort?: (a: T, b: T) => number,
    ): this;
    mergeInPlaceNoUpdateNoChange(
        incomingData: Array<T>,
        keyField: keyof T,
        shouldOverride: (a: T, b: T) => boolean,
        sort?: (a: T, b: T) => number,
    );
    first(count?: number): Array<T>;
    last(count?: number): Array<T>;
    insert<U extends { index: number }>(element: U): Array<U>;
    toggle<U>(element: U, field?: keyof U);
    remove<U extends { index: number }>(element: U): Array<U>;
    replace<U extends { id: string } | object>(element: U, field?: keyof U): Array<U>;
    smartInsert<U>(element: U, field?: keyof U): Array<U>;
    smartRemove<U>(element: U, field?: keyof U): Array<U>;
}

type Address = import('./classes/Address').Address;
type AddressSigner = import('./classes/Address').AddressSigner;
type EthInt = import('./classes/Fraction').EthInt;
type PairInt = import('./classes/Fraction').PairInt;

type Fraction = import('./classes/Fraction').Fraction;
type Fraction2x96 = import('./classes/Fraction').Fraction2x96;
type Fraction2x128 = import('./classes/Fraction').Fraction2x128;

type Fractionish = import('./classes/Fraction').Fractionish;
type BigNumber = import('ethers').BigNumber;
type BigNumberish = import('ethers').BigNumberish;
type BytesLike = import('ethers').BytesLike;

type TransactionResponse = import('@ethersproject/providers').TransactionResponse;

type TransactionReceipt = import('@ethersproject/providers').TransactionReceipt;

declare type CSSPropertiesAnimated =
    import('@react-spring/web/dist/declarations/src/index').AnimatedProps<
        import('react').CSSProperties
    >;

declare type CSSNumber = `${number}rem` | `${number}px` | number;
