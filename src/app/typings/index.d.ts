/// <reference types="node" />
/// <reference types="react-dom" />
/// <reference types="react/next" />

declare module '*.module.css';

// declare module '*.module.css' {
//     const content: { [className: string]: string };
//     export default content;
// }

declare type AddressString = `0x${Lowercase<string>}`;

declare type Base64EncodedSvg = `data:image/svg+xml;base64,${string}`;
declare type Utf8EncodedSvg = `data:image/svg+xml;charset=UTF8,${string}`;

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

declare type Hash = `0x${string}`;
declare type GetBetterWalletConnect = `unknown-${string}`;
declare type ResponseHash = Hash | GetBetterWalletConnect;

type Entities = Splitter<NuggId, ItemId>;

declare type Wrap<A, B> = { [S in A]: B<S> }[A];

declare type TokenTypeWrapper<A> = Wrap<A, B>;

// type _SezViewSettingUnion<S extends TokenType> = S extends any ? SezViewSettings<S> : never;

// type SezViewSettingUnion = _SezViewSettingUnion<TokenType>;

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
