/* eslint-disable react-hooks/rules-of-hooks */
import invariant from 'tiny-invariant';
import { getAddress } from '@ethersproject/address';

export interface IAddress {
    hash: string;
    short: string;
}
export class Address implements IAddress {
    protected _hash: string;

    public static ZERO = new Address('0x0000000000000000000000000000000000000000');

    public static NULL = new Address('0x0000000000000000000000000000000000000069');

    constructor(address: string) {
        const addr = getAddress(address);
        invariant(!!addr, 'INVALID:ADDRESS');
        this._hash = addr;
    }

    get hash() {
        return this._hash.toLowerCase();
    }

    // get namehash() {
    //     return namehash(this.hash);
    // }

    // get reverse_namehash() {
    //     return namehash(`${this.hash.substr(2)}.addr.reverse`);
    // }

    get short() {
        return Address.shortenAddress(this);
    }

    public static isAddress(other: string): boolean {
        try {
            return !!getAddress(other);
        } catch (err) {
            return false;
        }
    }

    public equals(other: Address): boolean {
        invariant(this && other, 'INVALID:ADDRESS');

        return this.hash === other.hash;
    }

    public static shortenAddress(address: Address, chars = 4): string {
        try {
            return address.hash ? this.shortenAddressHash(address.hash, chars) : '';
        } catch (err) {
            return address.hash ? address.hash : '';
        }
    }

    public static shortenAddressHash(addressHash: string, chars = 4): string {
        if (addressHash !== '' && addressHash.length >= 42) {
            try {
                return `${addressHash.substring(0, chars + 2)}...${addressHash.substring(
                    42 - chars,
                )}`;
            } catch (e) {
                console.log(e);
                return addressHash;
            }
        }
        return addressHash;
    }
}

// export class EnsAddress extends Address {
//     private static ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/;

//     private _ens: string;
//     private _promise: Promise<this>;

//     private static _ens_cache: Dictionary<Dictionary<string>> = {};

//     constructor(address: string) {
//         if (address !== undefined) {
//             super(address);
//             this._promise = this.resolve();
//         } else {
//             super(Address.ZERO.hash);
//         }
//     }

//     private async resolve() {
//         const chain = store.getState().web3.currentChain;
//         if (!EnsAddress._ens_cache[chain]) {
//             EnsAddress._ens_cache[chain] = {};
//         }
//         if (
//             EnsAddress._ens_cache[chain][this.hash] &&
//             EnsAddress._ens_cache[chain][this.hash] !== 'INVALID.69'
//         ) {
//             this._ens = EnsAddress._ens_cache[chain][this.hash];
//         } else if (!this.ens) {
//             const res = await ENSHelper.resolve(this);
//             if (res) {
//                 this._ens = res;
//                 EnsAddress._ens_cache[chain][this.hash] = res;
//             } else {
//                 EnsAddress._ens_cache[chain][this.hash] = 'INVALID.69';
//             }
//         }
//         return this;
//     }

//     public async ensureEns() {
//         return await this._promise;
//     }

//     get short() {
//         return this.ens || Address.shortenAddress(this);
//     }

//     get ens() {
//         return this._ens;
//     }

//     get parsed() {
//         const match = this.hash.match(EnsAddress.ENS_NAME_REGEX);
//         if (!match) return undefined;
//         return {
//             name: `${match[1].toLowerCase()}eth`,
//             path: match[4],
//         };
//     }
// }

// export class AddressSigner extends EnsAddress {
//     private _signer: ethers.providers.JsonRpcSigner;

//     constructor(address: string, signer: ethers.providers.JsonRpcSigner) {
//         super(address);
//         this._signer = signer;
//     }

//     get signer() {
//         return this._signer;
//     }
// }
