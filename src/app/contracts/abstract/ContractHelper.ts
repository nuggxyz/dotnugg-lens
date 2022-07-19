import { Contract } from '@ethersproject/contracts';

export default class ContractHelper {
    protected static _instance: Contract | undefined;

    constructor() {
        if (new.target === ContractHelper) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
    }

    static get instance() {
        return ContractHelper._instance;
    }

    static set instance(_) {
        // return _;
    }

    static reset() {
        ContractHelper._instance = undefined;
    }

    public static errors: { [index: string]: string } = {
        'TMP:TEST:1': 'Hello this is an error',
    };
}
