import { BigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { parseEther, formatUnits } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';

export const toEth = (num: string): BigNumber => {
    return parseEther(num);
};

export const fromEth = (num: BigNumberish | string): string => {
    let parsedNum = num;
    if (typeof num === 'string') {
        parsedNum = BigNumber.from(num);
    }
    if (parsedNum === '0.0') return '0';
    const res = formatUnits(parsedNum);

    if (res === '0.0') return '0';

    return res;
};

export const ETH_ONE = toEth('1');
export const ETH_TEN = toEth('10');
export const ETH_HUNDRED = toEth('100');
export const ETH_THOUSAND = toEth('1000');
export const ETH_TEN_THOUSAND = toEth('10000');
export const ETH_HUNDRED_THOUSAND = toEth('100000');
export const ETH_MILLION = toEth('1000000');
export const ETH_BILLION = toEth('1000000000');
export const ETH_TRILLION = toEth('1000000000000');
export const TWO_128 = BigNumber.from(1).shl(128).sub(1);
export const TWO_64 = BigNumber.from(1).shl(64).sub(1);

export const TWO_96 = 0xff;
export const TWO_16 = 0xffff;

export const LOSS = BigNumber.from(10).pow(8);

export const DEADLINE = '10000000000000';
