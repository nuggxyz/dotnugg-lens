import { Log } from '@ethersproject/providers';

import { RevertError } from '@src/app/lib/errors';

/*  BASE: DO NOT CHANGE  */

interface EmitEventBase {
    type: EmitEventNames;
    // callback: (arg: Remap<Omit<this, 'callback'>>) => void;
    // waitFor?: EmitEventNames;
}

/*  INTERFACES: add new ones here  */

interface EmitTransactionReceipt extends EmitEventBase {
    type: EmitEventNames.TransactionReceipt;
    recipt: TransactionReceipt;
}

interface EmitPotentialTransactionReceipt extends EmitEventBase {
    type: EmitEventNames.PotentialTransactionReceipt;
    from: AddressString | null;
    to: AddressString;
    log: Log;
    txhash: Hash;
    success: boolean;
    error?: RevertError;
    validate: (from: AddressString, data: Hash) => boolean;
}

interface EmitTransactionResponse extends EmitEventBase {
    type: EmitEventNames.TransactionResponse;
    response: TransactionResponse;
}

interface EmitPotentialTransactionResponse extends EmitEventBase {
    type: EmitEventNames.PotentialTransactionResponse;
    txhash: ResponseHash;
    from: AddressString;
}

interface EmitTransactionSent extends EmitEventBase {
    type: EmitEventNames.TransactionSent;
}

interface EmitKeyboardClosed extends EmitEventBase {
    type: EmitEventNames.KeyboardClosed;
}

interface EmitModalOpen extends EmitEventBase {
    type: EmitEventNames.OfferModalOpened;
    onModalOpen: () => void;
}

interface EmitRequestTokenSvgQuery extends EmitEventBase {
    type: EmitEventNames.RequestTokenSvgQuery;
    data: TokenId;
    waitFor?: EmitEventNames.ReturnTokenSvgQuery;
}

interface EmitReturnTokenSvgQuery extends EmitEventBase {
    type: EmitEventNames.ReturnTokenSvgQuery;
    data: string | null;
}

interface EmitHealthCheck extends EmitEventBase {
    type: EmitEventNames.HealthCheck;
}

interface EmitWorkerIsRunning extends EmitEventBase {
    type: EmitEventNames.WorkerIsRunning;
    label: string;
}
interface EmitDevLog extends EmitEventBase {
    type: EmitEventNames.DevLog;
    data: any;
    name: string;
}

interface EmitRouteChange extends EmitEventBase {
    type: EmitEventNames.RouteChange;
    prevRoute: string | null;
    newRoute: string;
}

interface EmitRequestCloseMobileNavbar extends EmitEventBase {
    type: EmitEventNames.RequestCloseMobileNavbar;
}

/*  EXPORTS: must be manually updated  */

export enum EmitEventNames {
    PotentialTransactionReceipt = 'main.PotentialTransactionReceipt',
    PotentialTransactionResponse = 'main.PotentialTransactionResponse',
    TransactionReceipt = 'main.TransactionReceipt',
    TransactionResponse = 'main.TransactionResponse',
    OfferModalOpened = 'main.OfferModalOpened',
    TransactionSent = 'main.TransactionSent',
    // on chain events
    Mint = 'main.rpc.event.Mint',
    Transfer = 'main.rpc.event.Transfer',
    Offer = 'main.rpc.event.Offer',
    OfferMint = 'main.rpc.event.OfferMint',
    Stake = 'main.rpc.event.Stake',
    Loan = 'main.rpc.event.Loan',
    Liquidate = 'main.rpc.event.Liquidate',
    Rebalance = 'main.rpc.event.Rebalance',
    Claim = 'main.rpc.event.Claim',
    ClaimItem = 'main.rpc.event.ClaimItem',
    KeyboardClosed = 'main.viewport.KeyboardClosed',
    Rotate = 'main.rpc.event.Rotate',
    DevLog = 'dev.log',
    IncomingRpcEvent = 'worker.rpc.event',
    IncomingRpcBlock = 'worker.rpc.block',
    IncomingEtherscanPrice = 'worker.etherscan.price',
    RequestTokenSvgQuery = 'main.graphql.RequestTokenSvgQuery',
    ReturnTokenSvgQuery = 'worker.graphql.ReturnTokenSvgQuery',
    HealthCheck = 'main.health.HealthCheck',
    WorkerIsRunning = 'worker.health.WorkerIsRunning',
    RouteChange = 'main.local.RouteChange',
    RequestCloseMobileNavbar = 'main.local.RequestCloseMobileNavbar',
    // Sell = 'local.rpc.event.Sell',
}

export type EmitEvents =
    | EmitTransactionReceipt
    | EmitTransactionResponse
    | EmitPotentialTransactionResponse
    | EmitPotentialTransactionReceipt
    | EmitTransactionSent
    | EmitKeyboardClosed
    | EmitHealthCheck
    | EmitWorkerIsRunning
    | EmitDevLog
    | EmitRouteChange
    | EmitRequestCloseMobileNavbar
    | EmitRequestTokenSvgQuery
    | EmitModalOpen
    | EmitReturnTokenSvgQuery;
