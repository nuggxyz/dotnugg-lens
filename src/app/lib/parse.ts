import { BigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { hexZeroPad } from '@ethersproject/bytes';

import { EthInt } from '@src/app/classes/Fraction';

const agency = (_agency: BigNumberish) => {
    const bn = BigNumber.from(_agency);
    const address = bn.mask(160);
    return {
        address: hexZeroPad(address._hex, 20) as AddressString,
        addressAsBigNumber: address,
        eth: EthInt.fromNuggftV1Agency(_agency),
        epoch: bn.shr(230).mask(24).toNumber(),
        flag: bn.shr(254).toNumber(),
    };
};

const lastItemSwap = (_lis: BigNumber) => {
    const items: { tokenId: TokenId; endingEpoch: number }[] = [];

    let working = BigNumber.from(_lis);

    do {
        const curr = working.mask(48);
        if (!curr.isZero()) {
            items.push({
                tokenId: curr.shr(24).toString().toItemId(),
                endingEpoch: curr.mask(24).toNumber(),
            });
        }
        // eslint-disable-next-line no-cond-assign
    } while (!(working = working.shr(48)).isZero());

    return items;
};

const proof = (_proof: BigNumberish) => {
    let working = BigNumber.from(_proof);

    const seen: Dictionary<{
        tokenId: ItemId;
        feature: number;
        position: number;
        count: number;
        displayed: boolean;
    }> = {};

    const seenFeatures: Dictionary<boolean> = {};

    let index = 0;
    do {
        const curr = working.and('65535');
        if (!curr.eq(0)) {
            if (!seen[curr._hex]) {
                seenFeatures[curr.div(1000).toNumber()] = true;
                seen[curr._hex] = {
                    tokenId: curr.toString().toItemId(),
                    feature: curr.div(1000).toNumber(),
                    position: curr.mod(1000).toNumber(),
                    count: 1,
                    displayed: !seenFeatures[curr.div(1000).toNumber()] && index < 8,
                };
            } else {
                seen[curr._hex].count++;
            }
            seenFeatures[curr.div(1000).toNumber()] = true;
        }
        index++;
    } while (!(working = working.shr(16)).isZero());

    return Object.values(seen);
};

export default { agency, proof, lastItemSwap };
