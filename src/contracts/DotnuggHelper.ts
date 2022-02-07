import { Contract } from 'ethers';

import { getProvider } from '../config';
import { isUndefinedOrNullOrObjectEmpty } from '../lib';
import { DotnuggV1, DotnuggV1__factory } from '../typechain';
import Web3Config from '../Web3Config';

import ContractHelper from './abstract/ContractHelper';

export class DotnuggV1Helper extends ContractHelper {
    protected static _instance: DotnuggV1;
    static get instance() {
        if (isUndefinedOrNullOrObjectEmpty(DotnuggV1Helper._instance)) {
            DotnuggV1Helper._instance = new Contract(
                Web3Config.activeChain__DotnuggV1,
                DotnuggV1__factory.abi,
                getProvider(),
            ) as DotnuggV1;
        }
        return DotnuggV1Helper._instance;
    }
}
