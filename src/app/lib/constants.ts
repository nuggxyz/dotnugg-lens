export default {
    NUGGDEX_SEARCH_LIST_CHUNK: 10 as const,

    BLOCKTIME: 25000 as const,
    QUERYTIME: 10000 as const,
    // PRE_MINT_STARTING_EPOCH: 500,
    // PRE_MINT_ENDING_EPOCH: 3000,
    MIN_OFFER: 0.03 as const, // 5,
    ANIMATION_DELAY: 100 as const,
    ANIMATION_CONFIG: {
        precision: 0.001 as const,
        frequency: 1.1 as const,
        damping: 0.9 as const,
        clamp: true as const,
    },
    NUGGDEX_ALLNUGGS_PREVIEW_COUNT: 7 as const,
    NUGGDEX_DEFAULT_PREVIEW_COUNT: 3 as const,
    ID_PREFIX_ITEM: 'item-' as const,
    FEATURE_BASE: 0 as const,

    VIEWING_PREFIX: 'id' as const,
} as const;

export type ITEM_ID = `item-${string}`;
