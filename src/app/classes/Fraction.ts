// eslint-disable-next-line max-classes-per-file
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import Decimal from 'decimal.js-light';
import numbro from 'numbro';

import { toEth, TWO_128, TWO_96, ETH_ONE, TWO_16, TWO_64 } from '@src/app/lib/conversion';
import { toGwei } from '@src/app/lib/index';

// eslint-disable-next-line no-use-before-define
export type Fractionish = BigNumberish | { num: BigNumber; den: BigNumber };

export class Fraction {
    public num: BigNumber;

    public den: BigNumber;

    public static ZERO = new Fraction(BigNumber.from(0));

    public static ONE = new Fraction(BigNumber.from(1));

    public scale(denominator: BigNumberish) {
        const me = this.copy();
        me.num = me.num.mul(denominator);
        me.den = me.den.mul(denominator);
        return me;
    }

    constructor(num: BigNumberish, den: BigNumberish = BigNumber.from(1)) {
        this.num = BigNumber.from(num);
        this.den = BigNumber.from(den);
    }

    get rat() {
        return this.num.div(this.den);
    }

    get decimal() {
        return this.den.toString() === '0'
            ? new Decimal(0)
            : new Decimal(this.num.toString()).div(new Decimal(this.den.toString()));
    }

    get number() {
        return this.decimal.toNumber();
    }

    get bignumber() {
        return this.num.mul(ETH_ONE).div(this.den);
    }

    public percentString(decimals: number) {
        return `${(this.number * 100).toFixed(decimals)}%`;
    }

    public toUsd() {
        const usd = new UsdInt(0);
        usd.num = this.num;
        usd.den = this.den;
        return usd;
    }

    public toEth() {
        const eth = new EthInt(0);
        eth.num = this.num;
        eth.den = this.den;
        return eth;
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

    public get mutable() {
        return new Fraction(this.num, this.den);
    }

    protected static tryParseFraction(
        fractionish: Fractionish,
        base = BigNumber.from(1),
    ): Fraction {
        try {
            if (fractionish instanceof Fraction) {
                return fractionish;
            }
            // const gcd = function (a, b) {
            //     if (!b) return a;
            // console.log({ fractionish });
            //     return gcd(b, a % b);
            // };

            if (
                (typeof fractionish === 'string' && fractionish.includes('.')) ||
                typeof fractionish === 'number'
            ) {
                const abc = new Decimal(fractionish);

                const poww = BigNumber.from(10).pow(abc.decimalPlaces());

                const integer = BigNumber.from(abc.toString().replaceAll('.', ''));

                const ret = new Fraction(integer, poww);

                return ret;
            }

            if (
                BigNumber.isBigNumber(fractionish) ||
                typeof fractionish === 'string' ||
                typeof fractionish === 'bigint'
            )
                return new Fraction(fractionish, base);

            const unsafe = fractionish as unknown as { den: BigNumberish; num: BigNumberish };
            if ((unsafe as Fraction).num && (unsafe as Fraction).den)
                return new Fraction(unsafe.num, unsafe.den);

            // console.log({ unsafe });
            throw new Error('Could not parse fraction');
        } catch (e) {
            // console.error(e);
            throw new Error('Could not parse fraction');
        }
    }

    public increase(percent: bigint) {
        return this.multiply(new Fraction(percent + BigInt(100), 100));
    }

    public add(other: Fractionish) {
        const me = this.copy();
        const otherParsed = Fraction.tryParseFraction(other);
        if (me.den.eq(otherParsed.num)) {
            me.num = me.num.add(otherParsed.num);
            return me;
        }
        me.num = me.num.mul(otherParsed.den).add(otherParsed.num.mul(me.den));
        me.den = me.den.mul(otherParsed.den);
        return me;
    }

    public sub(other: Fractionish) {
        const me = this.copy();
        const otherParsed = Fraction.tryParseFraction(other);
        if (me.den.eq(otherParsed.num)) {
            me.num = me.num.sub(otherParsed.num);
            return me;
        }
        me.num = me.num.mul(otherParsed.den).sub(otherParsed.num.mul(me.den));
        me.den = me.den.mul(otherParsed.den);
        return me;
    }

    public multiply(other: Fractionish) {
        const me = this.copy();

        const otherParsed = Fraction.tryParseFraction(other);
        me.num = me.num.mul(otherParsed.num);
        me.den = me.den.mul(otherParsed.den);
        return me;
    }

    public divide(other: Fractionish) {
        const me = this.copy();

        const otherParsed = Fraction.tryParseFraction(other);
        me.num = me.num.mul(otherParsed.den);
        me.den = me.den.mul(otherParsed.num);
        return me;
    }

    public asFraction(): Fraction {
        return new Fraction(this.num, this.den);
    }

    public copy(): Fraction {
        return new Fraction(this.num, this.den);
    }

    public static fromX64(input: Fractionish) {
        const me = this.tryParseFraction(input);
        me.den = me.den.mul(TWO_64);
        return me;
    }
}

export class Fraction2x128 extends Fraction {
    constructor(num: BigNumberish) {
        super(BigNumber.from(num), TWO_128);
    }
}

export class Fraction2x16 extends Fraction {
    constructor(num: BigNumberish) {
        super(BigNumber.from(num), TWO_16);
    }
}

export class Fraction2x96 extends Fraction {
    constructor(num: BigNumberish) {
        super(BigNumber.from(num), TWO_96);
    }
}

export class CurrencyInt extends Fraction {
    public symbol: string;

    constructor(value: BigNumberish, base: BigNumberish, symbol: string) {
        super(BigNumber.from(value), base);
        this.symbol = symbol;
    }

    // using a currency library here in case we want to add more in future
    public formatDollarAmount() {
        // round = true, // digits = 2, // num: number | undefined,
        const num = this.decimal.toNumber();
        const digits = 4;
        const round = true;

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

    public static format(num: number, digits = 3) {
        if (num === 0) return '0';
        if (!num) return '-';
        if (num < 0.001) {
            return digits === 2 ? '<0.01' : '<0.001';
        }
        return numbro(num).format({
            average: true,
            mantissa: num > 100 ? 0 : num > 10 ? 1 : digits,
            abbreviations: {
                million: 'M',
                billion: 'B',
            },
            trimMantissa: false,

            // totalLength: num > 1000 ? 2 : digits ,
        });
    }

    // using a currency library here in case we want to add more in future
    public formatAmount() {
        return CurrencyInt.format(this.decimal.toNumber());
    }
}

export class EthInt extends CurrencyInt {
    public base = ETH_ONE;

    public static ZERO = new EthInt(BigNumber.from(0));

    public static ONE = new EthInt(BigNumber.from(1));

    constructor(value: BigNumberish) {
        super(value, ETH_ONE, 'ETH');
    }

    public static fromNuggftV1Agency(value: BigNumberish): EthInt {
        return new EthInt(BigNumber.from(value).shr(160).mask(70).mul(100000000));
    }

    public static fromNuggftV1Stake(cache: BigNumberish) {
        const bn = BigNumber.from(cache);
        return {
            shares: bn.shr(192),
            staked: bn.shr(96).mask(96),
            eps: EthInt.fromFractionRaw(new Fraction(bn.shr(96).mask(96), bn.shr(192))),
        };
    }

    public static tryParseFrac(value: Fractionish): EthInt {
        const abc = super.tryParseFraction(value, ETH_ONE);

        const n = new EthInt(0);
        n.num = abc.num;
        n.den = abc.den;

        return n;
    }

    public static fromGwei(value: BigNumberish): EthInt {
        return new EthInt(toGwei(value.toString()));
    }

    public static fromEthDecimal(value: number): EthInt {
        return new EthInt(toEth(value.toFixed(18)));
    }

    public static fromEthDecimalString(value: string): EthInt {
        if (value === '0.0') return new EthInt(0);
        return new EthInt(toEth(value));
    }

    public toFixedStringRoundingUp(value: number) {
        const fixed = this.number.toFixed(value);

        if (Number(fixed) === this.number) {
            return fixed;
        }
        const ceil = Math.ceil(this.number * 10 ** value) / 10 ** value;
        return ceil.toFixed(value);
    }

    public increaseToFixedStringRoundingUp(value: bigint, dec: number) {
        return this.increase(value).toFixedStringRoundingUp(dec);
    }

    public toFixedStringRoundingUpAddOneForSafety(value: number) {
        const fixed = this.number.toFixed(value);

        if (Number(fixed) === this.number) {
            return fixed;
        }
        const ceil = (Math.ceil(this.number * 10 ** value) + 1) / 10 ** value;
        return ceil.toFixed(value);
    }

    public static fromEthString(value: string): EthInt {
        return new EthInt(toEth(value));
    }

    public static fromFraction(value: Fraction): EthInt {
        try {
            const bob = new EthInt(0);
            bob.num = value.num;
            bob.den = value.den.mul(ETH_ONE);
            return bob;
        } catch (err) {
            return EthInt.ZERO;
        }
    }

    public static fromFractionRaw(value: Fraction): EthInt {
        try {
            const bob = new EthInt(0);
            bob.num = value.num;
            bob.den = value.den;
            return bob;
        } catch (err) {
            return EthInt.ZERO;
        }
    }

    public asUsd(value: UsdInt) {
        return UsdInt.convert(this.multiply(value));
    }

    public copy(): EthInt {
        const me = new EthInt(0);
        me.num = this.num;
        me.den = this.den;
        return me;
    }

    public override increase(other: bigint) {
        return EthInt.fromFractionRaw(super.increase(other));
    }

    public add(other: Fractionish) {
        return EthInt.fromFractionRaw(super.add(other));
    }

    public sub(other: Fractionish) {
        return EthInt.fromFractionRaw(super.sub(other));
    }

    public multiply(other: Fractionish) {
        return EthInt.fromFractionRaw(super.multiply(other));
    }

    public divide(other: Fractionish) {
        return EthInt.fromFractionRaw(super.divide(other));
    }
}

export class UsdInt extends CurrencyInt {
    constructor(value: number) {
        super(Math.round(value * 100), 100, 'USD');
    }

    public static convert(input: Fraction) {
        const me = new UsdInt(0);
        me.num = input.num;
        me.den = input.den;
        return me;
    }

    public copy(): UsdInt {
        const me = new UsdInt(0);
        me.num = this.num;
        me.den = this.den;
        return me;
    }

    public static fromFraction(value: Fraction): UsdInt {
        try {
            const bob = new UsdInt(0);
            bob.num = value.num;
            bob.den = value.den;
            return bob;
        } catch (err) {
            return new UsdInt(0);
        }
    }

    public override increase(other: bigint) {
        return UsdInt.fromFraction(super.increase(other));
    }

    public add(other: Fractionish) {
        return UsdInt.fromFraction(super.add(other));
    }

    public sub(other: Fractionish) {
        return UsdInt.fromFraction(super.sub(other));
    }

    public multiply(other: Fractionish) {
        return UsdInt.fromFraction(super.multiply(other));
    }

    public divide(other: Fractionish) {
        return UsdInt.fromFraction(super.divide(other));
    }
}

export class PairInt {
    public readonly eth: EthInt;

    public readonly usd: UsdInt;

    public readonly preference: 'ETH' | 'USD';

    constructor(eth: EthInt, usd: UsdInt, preference = 'ETH' as 'ETH' | 'USD') {
        this.eth = eth;
        this.usd = usd;
        this.preference = preference;
    }

    public get selected() {
        if (this.preference === 'ETH') return this.eth;
        return this.usd;
    }

    public static fromUsdPrice(
        eth: Fractionish,
        usdPrice: number,
        preference = 'ETH' as 'ETH' | 'USD',
    ) {
        const ether = EthInt.tryParseFrac(eth);
        return new PairInt(ether, ether.copy().asUsd(new UsdInt(usdPrice)), preference);
    }
}
