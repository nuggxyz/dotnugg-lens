enum TokenType {
    Nugg = 'nugg',
    Item = 'item',
}

declare type NuggId = `${'nugg'}-${number}`;
declare type ItemId = `${'item'}-${number}`;
declare type TokenId = NuggId | ItemId;

declare interface Splitter<N, I> {
    nugg: N;
    item: I;
}
declare type IdPrefix = 'nugg' | 'item';

declare function IdFixture<K extends TokenType, T extends `${K}`>(
    what: T,
): T extends infer R ? (R extends K ? TokenType[R] : never) : never;

declare function IsIdFixture<K extends TokenType, T extends `${K}`>(
    what: T,
): T extends infer R ? (R extends K ? this is TokenType[R] : never) : never;
declare function EnsureIdFixture<K extends TokenType, T extends `${K}`>(
    what: T,
): T extends infer R ? (R extends K ? TokenType[R] : undefined) : undefined;

// declare type PickFromFactory<T extends TokenIdFactory, N, I> = Splitter<N, I>[T['type']];

declare type PickFromTokenId<T extends TokenId, N, I> = T extends `${infer R}-${number}`
    ? R extends 'nugg' | 'item'
        ? Splitter<N, I>[R]
        : never
    : never;

interface TokenIdFactoryBase {
    tokenId: TokenId;
    type: 'nugg' | 'item';
}

interface TokenIdFactory<G extends TokenIdFactoryBase> extends G {
    tokenId: TokenId;
    type: 'nugg' | 'item';
    isItem: () => this is ItemIdFactory<G>;
    isNugg: () => this is NuggIdFactory<G>;
}

interface NuggIdFactory<G> extends TokenIdFactory<G> {
    type: 'nugg';
    tokenId: NuggId;
}

interface ItemIdFactory<G> extends TokenIdFactory<G> {
    type: 'item';
    tokenId: ItemId;
}

type SmartPickFromTokenId<A extends TokenId, B extends TokenIdFactory> = PickFromTokenId<
    A,
    IsolateNuggIdFactory<B>,
    IsolateItemIdFactory<B>
>;

// type NameOrId<B extends { tokenId: NuggId | ItemId }> = B extends { tokenId: NuggId }
//     ? NuggIdFactory<B>
//     : ItemIdFactory<B>;

// type NameOrId2<
//     B extends { tokenId: `${'nugg' | 'item'}-${number}` },
//     A,
//     C,
// > = B['tokenId'] extends `nugg-${number}` ? NuggIdFactory<B, A> : ItemIdFactory<B, C>;

// type  TokenIdCreatorFactory<A, B extends A, C extends A> =

// type TokenIdFactoryCreator<A extends TokenIdFactoryBase, B, C> =
//     | NuggIdFactory<A & B>
//     | ItemIdFactory<A & C>;

type TokenIdFactoryCreator<A extends TokenIdFactoryBase, B, C> =
    | NuggIdFactory<Remap<B & A>>
    | ItemIdFactory<Remap<C & A>>;

type IsolateItemIdFactory<T extends TokenIdFactory> = Remap<{ type: 'item' } & T>;
type IsolateNuggIdFactory<T extends TokenIdFactory> = Remap<{ type: 'nugg' } & T>;

type TokenIdDictionary<T extends TokenIdFactory> = {
    [x: ItemId]: IsolateItemIdFactory<T>;
    [x: NuggId]: IsolateNuggIdFactory<T>;
};

// type To<T extends TokenIdFactory, G extends TokenId> = Record<
//     T['tokenId'] extends infer G ? G : never,
//     PickFromTokenId<R, T & NuggIdFactory, T & ItemIdFactory>
// >;

// type To<T extends TokenIdFactory> = T extends NuggIdFactory ? Record<
//     NuggId,
//     PickFromTokenId<R, T & NuggIdFactory, T & ItemIdFactory>
// > | Record<
// T['tokenId'] extends infer G ? G : never,
// PickFromTokenId<R, T & NuggIdFactory, T & ItemIdFactory>
// >;
