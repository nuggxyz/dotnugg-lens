import { BigNumber, ethers } from 'ethers';

import { isUndefinedOrNullOrStringEmpty } from '../lib';

export class Svg {
    public static decompressA(a: BigNumber): BigNumber {
        if (a.eq(7)) return BigNumber.from(255);
        else return a.mul(36);
    }

    private static getPixelAt = (
        arr: ethers.BigNumber[],
        x: number,
        y: number,
        width: number,
    ) => {
        const index = x + y * width;

        const pix = arr[Math.floor(index / 6)].shr(42 * (index % 6));
        const a = this.decompressA(pix.and(0x7));
        const rgb_ = pix.shl(5).and(0xffffff00);
        const color = rgb_.or(a)._hex;

        const val = arr[Math.floor(index / 6)]
            .shr(42 * (index % 6))
            .and('0xffffffffff');
        const color2 = ethers.utils.hexZeroPad(color, 4).replace('0x', '#');
        return {
            color: color2 === '#00000000' ? 'nope' : color2,
            id: val.shr(27).and('0xff').toNumber(),
            z: val.shr(35).and('0xf').toNumber(),
            feature: val.shr(39).and('0x7').toNumber(),
        };
    };

    public static drawSvgFromString(input: string, multip) {
        // console.log(input.split('='));
        return this.drawSvg(
            input
                .split('0x')
                .reduce(
                    (arr, num) =>
                        !isUndefinedOrNullOrStringEmpty(num)
                            ? arr.concat(BigNumber.from(`0x${num}`))
                            : arr,
                    [],
                ),
            multip,
        );
    }

    public static drawSvg(
        _input: ethers.BigNumber[],
        multip: number,
        prettyPrint: boolean = false,
    ): string {
        const usethis: BigNumber[] = [];

        for (var i = 0; i < _input.length; i++) {
            // byteLen += _input[i]._hex.length;

            let numzeros = _input[i].and(0xf);

            if (numzeros.eq(0xf)) {
                numzeros = _input[i++].shr(4);
            }

            for (var j = 0; j < numzeros.toNumber(); j++) {
                usethis.push(BigNumber.from(0));
            }

            usethis.push(_input[i].shr(4));

            // console.log(usethis[usethis.length - 1]._hex);

            // console.log('--');
            // zerosSaved += numzeros.toNumber();
        }
        const tmp = usethis[usethis.length - 1];
        const tmp2 = usethis[usethis.length - 1];
        const width = tmp.shr(63).and(0x3f).toNumber();
        const height = tmp2.shr(69).and(0x3f).toNumber();
        let res = '';

        res += String(
            "<svg viewBox='0 0 " +
                width * multip +
                ' ' +
                width * multip +
                "' width='" +
                width * multip +
                "' height='" +
                width * multip +
                "' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
                (prettyPrint ? '\n' : ''),
        );

        const getRekt = (
            pix: any,
            x: number,
            y: number,
            xlen: number,
            ylen: number,
        ): string => {
            if (pix.color === 'nope') return '';
            return String(
                (prettyPrint ? '\t' : '') +
                    "<rect fill='" +
                    pix.color +
                    "' x='" +
                    x * multip +
                    "' y='" +
                    y * multip +
                    "' width='" +
                    xlen * multip +
                    "' height='" +
                    ylen * multip +
                    "'/>" +
                    (prettyPrint ? '\n' : ''),
            );
        };

        // bytes memory footer = hex'3c2f7376673e';

        let last = this.getPixelAt(usethis, 0, 0, width);
        let count = 1;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                if (y == 0 && x == 0) x++;
                let curr = this.getPixelAt(usethis, x, y, width);
                if (curr.color === last.color) {
                    count++;
                    continue;
                } else {
                    // curr.log('yup');
                    // rects[index++] = getRekt(last, x - count, y, count, 1);
                    res += getRekt(last, x - count, y, count, 1);
                    last = curr;
                    count = 1;
                }
            }
            res += getRekt(last, width - count, y, count, 1);
            last = { color: 'nope', z: 0, feature: 0, id: 0 };
            count = 0;
        }
        return res + '</svg>';
    }

    public static decodeSvg(data: string[]) {
        const paletteLength = +data[0];

        const palette = [];
        const rekts = [];

        for (let i = 1; i < paletteLength + 1; i++) {
            palette.push(
                ethers.utils
                    .hexZeroPad(BigNumber.from(data[i])._hex, 4)
                    .replace('0x', '#'),
            );
        }

        for (let i = paletteLength + 1; i < data.length; i++) {
            let d = +data[i];
            let color = d & 255;
            d >>= 8;
            let x = d & 255;
            d >>= 8;
            let y = d & 255;
            d >>= 8;
            let xlen = d & 255;
            rekts.push(
                `<rect class="_${color}" x="${x}" y="${y}" width="${xlen}" height="1"/>`,
            );
        }

        return `<svg viewbox="0 0 63 63" height="63" width="63" version="1.2" id="Layer_1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" xml:space="preserve"><style><![CDATA[${palette
            .map((p, index) => `._${index}{fill:${p}}`)
            .join('')}]]></style>${rekts.join('')}</svg>`;
    }
}
