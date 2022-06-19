export enum FeedMessageType {
    Offer,
}

export interface BaseFeedMessage {
    type: FeedMessageType;
    id: string;
    block: number;
}

export interface OfferFeedMessage extends BaseFeedMessage {
    type: FeedMessageType.Offer;
    id: string;
    user: string;
    tokenId: string;
    eth: EthInt;
    block: number;
}

export interface OfferFeedMessage2 extends BaseFeedMessage {
    type: FeedMessageType.Offer;
    id: string;
    user: string;
    tokenId: string;
    eth: EthInt;
    block: number;
}

export type FeedMessage = OfferFeedMessage | OfferFeedMessage2;
