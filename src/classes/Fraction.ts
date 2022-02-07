import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import Decimal from 'decimal.js-light';
import numbro from 'numbro';

import { fromEth, toEth, TWO_128, TWO_96 } from './../lib/conversion';
import { ETH_ONE } from './../lib/conversion';

export enum Currency {
    'ETH' = 0,
    'WETH' = 1,
    'xNUGG' = 2,
}

export type Fractionish = BigNumberish | Fraction;

export class Fraction {
    public num: BigNumber;
    public den: BigNumber;

    public static ZERO = new Fraction(BigNumber.from(0));
    public static ONE = new Fraction(BigNumber.from(1));

    constructor(num: BigNumberish, den: BigNumberish = BigNumber.from(1)) {
        this.num = BigNumber.from(num);
        this.den = BigNumber.from(den);
        return this;
    }

    get rat() {
        return this.num.div(this.den);
    }

    get decimal() {
        return new Decimal(this.num.toString()).div(
            new Decimal(this.den.toString()),
        );
    }

    get bignumber() {
        return this.num.mul(ETH_ONE).div(this.den);
    }

    public add(other: Fractionish): Fraction {
        const otherParsed = Fraction.tryParseFraction(other);
        if (this.den.eq(otherParsed.num)) {
            return new Fraction(this.num.add(otherParsed.num), this.den);
        }
        return new Fraction(
            this.num.mul(otherParsed.den).add(otherParsed.num.mul(this.den)),
            this.den.mul(otherParsed.den),
        );
    }

    public sub(other: Fractionish): Fraction {
        const otherParsed = Fraction.tryParseFraction(other);
        if (this.den.eq(otherParsed.num)) {
            return new Fraction(this.num.sub(otherParsed.num), this.den);
        }
        return new Fraction(
            this.num.mul(otherParsed.den).sub(otherParsed.num.mul(this.den)),
            this.den.mul(otherParsed.den),
        );
    }

    public lt(other: Fractionish): boolean {
        const otherParsed = Fraction.tryParseFraction(other);
        return this.num.mul(otherParsed.den).lt(otherParsed.num.mul(this.den));
    }

    public eq(other: Fractionish): boolean {
        const otherParsed = Fraction.tryParseFraction(other);
        return this.num.mul(otherParsed.den).eq(otherParsed.num.mul(this.den));
    }

    public gt(other: Fractionish): boolean {
        const otherParsed = Fraction.tryParseFraction(other);
        return this.num.mul(otherParsed.den).gt(otherParsed.num.mul(this.den));
    }

    public multiply(other: Fractionish): Fraction {
        const otherParsed = Fraction.tryParseFraction(other);
        return new Fraction(
            this.num.mul(otherParsed.num),
            this.den.mul(otherParsed.den),
        );
    }

    public divide(other: Fractionish): Fraction {
        const otherParsed = Fraction.tryParseFraction(other);
        return new Fraction(
            this.num.mul(otherParsed.den),
            this.den.mul(otherParsed.num),
        );
    }

    public asFraction(): Fraction {
        return new Fraction(this.num, this.den);
    }

    protected static tryParseFraction(fractionish: Fractionish): Fraction {
        if (
            fractionish instanceof BigNumber ||
            typeof fractionish === 'number' ||
            typeof fractionish === 'string'
        )
            return new Fraction(fractionish);

        try {
            let unsafe = fractionish as any;
            if (unsafe.num && unsafe.den) return fractionish as Fraction;
            else {
                console.log({ unsafe });
                throw new Error('Could not parse fraction');
            }
        } catch (e) {
            throw new Error('Could not parse fraction');
        }
    }
}

export class Fraction2x128 extends Fraction {
    constructor(num: BigNumberish) {
        super(BigNumber.from(num), TWO_128);
    }
}

export class Fraction2x96 extends Fraction {
    constructor(num: BigNumberish) {
        super(BigNumber.from(num), TWO_96);
    }
}
export class PairInt {
    public eth: EthInt;
    public usd: EthInt;

    constructor(eth: BigNumberish, usd: BigNumberish) {
        this.eth = new EthInt(eth);
        this.usd = new EthInt(usd);
        return this;
    }
}

export class EthInt extends Fraction {
    public static ZERO = new EthInt(BigNumber.from(0));
    public static ONE = new EthInt(BigNumber.from(1));

    constructor(value: BigNumberish) {
        super(BigNumber.from(value), ETH_ONE);
    }

    public static tryParseFrac(value: Fractionish): EthInt {
        return Fraction.tryParseFraction(value) as EthInt;
    }

    public static fromEthDecimal(value: number): EthInt {
        return new EthInt(toEth(value.toFixed(18)));
    }
    public static fromEthDecimalString(value: string): EthInt {
        return new EthInt(fromEth(value));
    }

    public static fromEthString(value: string): EthInt {
        return new EthInt(toEth(value));
    }

    public static fromFraction(value: Fraction): EthInt {
        try {
            let bob = new EthInt(0);
            bob.num = value.num;
            bob.den = value.den;
            return bob;
        } catch (err) {
            return EthInt.ZERO;
        }
    }

    // using a currency library here in case we want to add more in future
    public formatDollarAmount() {
        // round = true, // digits = 2, // num: number | undefined,
        let num = this.decimal.toNumber();
        let digits = 4;
        let round = true;

        if (num === 0) return '$0.00';
        if (!num) return '-';
        if (num < 0.001 && digits <= 3) {
            return '<$0.001';
        }

        return numbro(num).formatCurrency({
            average: round,
            mantissa: num > 1000 ? 2 : digits,
            abbreviations: {
                million: 'M',
                billion: 'B',
            },
            trimMantissa: false,

            // totalLength: num > 1000 ? 2 : digits,
        });
    }

    // using a currency library here in case we want to add more in future
    public formatAmount() {
        let num = this.decimal.toNumber();
        let digits = 3;

        if (num === 0) return '0';
        if (!num) return '-';
        if (num < 0.001) {
            return '<0.001';
        }
        return numbro(num).format({
            average: true,
            mantissa: num > 1000 ? 2 : digits,
            abbreviations: {
                million: 'M',
                billion: 'B',
            },
            trimMantissa: false,
            // totalLength: num > 1000 ? 2 : digits,
        });
    }
}
