import { BigNumber, ethers } from 'ethers';

export const toEth = (num: string): ethers.BigNumber => {
    return ethers.utils.parseEther(num);
};

export const fromEth = (num: ethers.BigNumberish | string): string => {
    let parsedNum = num;
    if (typeof num === 'string') {
        parsedNum = BigNumber.from(num);
    }
    if (parsedNum == '0.0') return '0';
    return ethers.utils.formatUnits(parsedNum);
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
export const TWO_128 = ethers.constants.MaxInt256;
export const TWO_96 = 0xff;

export const DEADLINE = '10000000000000';
