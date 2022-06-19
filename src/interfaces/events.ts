import {
    ClaimEvent,
    ClaimItemEvent,
    LoanEvent,
    MintEvent,
    OfferEvent,
    OfferItemEvent,
    OfferMintEvent,
    StakeEvent,
    TransferEvent,
    LiquidateEvent,
    RebalanceEvent,
    RotateEvent,
} from '@src/typechain/NuggftV1';

export enum EventNames {
    Mint = 'Mint',
    Offer = 'Offer',
    OfferMint = 'OfferMint',
    OfferItem = 'OfferItem',
    Stake = 'Stake',
    Claim = 'Claim',
    ClaimItem = 'ClaimItem',
    Transfer = 'Transfer',
    TransferItem = 'TransferItem',
    Loan = 'Loan',
    Rebalance = 'Rebalance',
    Liquidate = 'Liquidate',
    Rotate = 'Rotate',
}

interface BaseEvent {
    name: EventNames;
}

export interface RpcMint extends BaseEvent {
    name: EventNames.Mint;
    args: MintEvent['args'];
}

export interface RpcLoan extends BaseEvent {
    name: EventNames.Loan;
    args: LoanEvent['args'];
}

export interface RpcRebalance extends BaseEvent {
    name: EventNames.Rebalance;
    args: RebalanceEvent['args'];
}
export interface RpcLiquidate extends BaseEvent {
    name: EventNames.Liquidate;
    args: LiquidateEvent['args'];
}
export interface RpcOffer extends BaseEvent {
    name: EventNames.Offer;
    args: OfferEvent['args'];
}

export interface RpcOfferMint extends BaseEvent {
    name: EventNames.OfferMint;
    args: OfferMintEvent['args'];
}

export interface RpcOfferItem extends BaseEvent {
    name: EventNames.OfferItem;
    args: OfferItemEvent['args'];
}

export interface RpcClaim extends BaseEvent {
    name: EventNames.Claim;
    args: ClaimEvent['args'];
}

export interface RpcClaimItem extends BaseEvent {
    name: EventNames.ClaimItem;
    args: ClaimItemEvent['args'];
}

export interface RpcStake extends BaseEvent {
    name: EventNames.Stake;
    args: StakeEvent['args'];
}

export interface RpcTransfer extends BaseEvent {
    name: EventNames.Transfer;
    args: TransferEvent['args'];
}

export interface RpcRotate extends BaseEvent {
    name: EventNames.Rotate;
    args: RotateEvent['args'];
}

export type InterfacedEvent =
    | RpcMint
    | RpcOfferMint
    | RpcOfferItem
    | RpcClaim
    | RpcClaimItem
    | RpcStake
    | RpcOffer
    | RpcTransfer
    | RpcLiquidate
    | RpcLoan
    | RpcRebalance
    | RpcRotate;
