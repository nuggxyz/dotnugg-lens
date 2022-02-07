import { isUndefinedOrNullOrStringEmpty } from '..';

import {
    DOTNUGG_COLOR_KEYS_INDEX_OFFSET,
    DOTNUGG_COLOR_PALLET_OFFSET,
    DOTNUGG_LENGTHS_INDEX_OFFSET,
    DOTNUGG_WIDTH_OFFSET,
} from './constants';
import { base64ToArr, uint16ToDec } from './util';

export type NuggJson = {
    name: string;
    description: string;
    image: string;
};

export const extractDotNuggBase64 = (jsonBase64: string) => {
    if (
        !isUndefinedOrNullOrStringEmpty(jsonBase64) &&
        jsonBase64.includes('json')
    ) {
        try {
            const json = JSON.parse(atob(jsonBase64.split(',')[1])) as NuggJson;
            return json.image.split(',')[1];
        } catch (e) {
            console.log(e);
            return '';
        }
    }
};

export const dotnuggToSvg = (dnString: string, multiplier: number = 10) => {
    if (!isUndefinedOrNullOrStringEmpty(dnString)) {
        const arr = base64ToArr(dnString);
        const width = parseInt(arr[DOTNUGG_WIDTH_OFFSET], 16);
        const colorPallet = createPallet(arr);
        const colorKeys = createColorKeys(arr);
        const lengths = createLengths(arr);
        return createSvg(width, colorPallet, colorKeys, lengths, multiplier);
    }
};

const createPallet = (bytesArr: string[]) => {
    const length = uint16ToDec(bytesArr.slice(DOTNUGG_COLOR_KEYS_INDEX_OFFSET));
    let colorPallet = [];
    for (let i = DOTNUGG_COLOR_PALLET_OFFSET; i < length; i += 4) {
        colorPallet.push(
            bytesArr
                .slice(i, i + 4)
                .reduce((acc, c) => acc + (c.length === 1 ? `0${c}` : c), ''),
        );
    }
    return colorPallet;
};

const createColorKeys = (bytesArr: string[]) => {
    const start = uint16ToDec(bytesArr.slice(DOTNUGG_COLOR_KEYS_INDEX_OFFSET));
    const end = uint16ToDec(bytesArr.slice(DOTNUGG_LENGTHS_INDEX_OFFSET));
    return bytesArr.slice(start, end).map((key) => parseInt(key, 16));
};

const createLengths = (bytesArr: string[]) => {
    const start = uint16ToDec(bytesArr.slice(DOTNUGG_LENGTHS_INDEX_OFFSET));
    const end = bytesArr.length;
    return bytesArr.slice(start, end).reduce((acc, merged) => {
        let one = parseInt(merged, 16) >> 4;
        let two = ~(one << 4) & parseInt(merged, 16);
        acc.push(one + 1, two + 1);
        return acc;
    }, []);
};

const createSvg = (
    width: number,
    colorPallet: string[],
    colorKeys: number[],
    lengths: number[],
    multiplier: number,
) => {
    let svg = `<svg viewBox='0 0 ${width * multiplier} ${
        width * multiplier
    }' width='${width * multiplier}' height='${
        width * multiplier
    }' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>\n`;
    let y = 0,
        x = 0;
    for (let i = 0; i < colorKeys.length; i++) {
        let color = colorPallet[colorKeys[i]];
        let length = lengths[i];

        while (x + length > width) {
            length = length + x - width;
            svg += getRekt(color, x, y, length, multiplier);
            y++;
            x = 0;
        }
        svg += getRekt(color, x, y, length, multiplier);
        x += length;
    }

    svg += '</svg>';
    return svg;
};

const getRekt = (
    color: string,
    x: number,
    y: number,
    length: number,
    multiplier: number,
) =>
    `\t<rect fill='#${color}' x='${x * multiplier}' y='${
        y * multiplier
    }' height='${1 * multiplier}' width='${length * multiplier}'/>\n`;
