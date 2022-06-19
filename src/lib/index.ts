// import { FEATURE_NAMES } from '@src/web3/config';

import { BigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { getAddress } from '@ethersproject/address';
import { parseUnits } from '@ethersproject/units';
import { hexZeroPad } from '@ethersproject/bytes';

import colors from './colors';
import constants from './constants';
import * as conversion from './conversion';
import fontSize from './fontSize';
import layout from './layout';
import parse from './parse';
import errors from './errors';
import txdata from './txdata';
import date from './date';
import { userAgent } from './userAgent';
import lodash from './lodash';

// 6287103
// VERIFICATION

type Undesireable = null | undefined | unknown;

type AllTypes<T> =
    | boolean
    | number
    | string
    | []
    | T[]
    | { [_: string]: object }
    | Record<string, never>
    | null
    | undefined
    | BigNumber;

// export const isNotAPainNotInTheAss = (arg: unknown): arg is boolean => {
//     if (
//         isUndefinedOrNullOrNotBigNumber(
//             isUndefinedOrNullOrStringEmptyOrZeroOrStringZero(
//                 isUndefinedOrNullOrStringEmpty(
//                     isUndefinedOrNullOrObjectEmpty(
//                         isUndefinedOrNullOrNotObject(
//                             isUndefinedOrNullOrArrayEmpty(
//                                 isUndefinedOrNullOrNotArray(isUndefinedOrNull(isUndefined(arg))),
//                             ),
//                         ),
//                     ),
//                 ),
//             ),
//         )
//     )
//         return false;
//     return !!arg;
// };

export const isUndefined = <T>(value: T | undefined | unknown): value is undefined => {
    return typeof value === 'undefined';
};

export const isNull = <T>(value: T | undefined | unknown): value is null => {
    return value === null;
};
export const isUndefinedOrNull = <T>(value: T | Undesireable): value is null | undefined => {
    return isUndefined(value) || value === null;
};
export const isUndefinedOrNullOrNotArray = <T>(
    value: T[] | Undesireable,
): value is null | undefined => {
    return isUndefinedOrNull(value) || !Array.isArray(value);
};
export const isUndefinedOrNullOrArrayEmpty = <T>(
    value: T[] | Undesireable,
): value is null | undefined | [] => {
    return isUndefinedOrNullOrNotArray(value) || (Array.isArray(value) && value.length === 0);
};
export const isUndefinedOrNullOrNotObject = <T extends Record<string, object>>(
    value: T | Undesireable,
): value is null | undefined => {
    return isUndefinedOrNull(value) || typeof value !== 'object';
};
export const isUndefinedOrNullOrObjectEmpty = <T extends Record<string, object>>(
    value: T | Undesireable,
): value is null | undefined | Record<keyof T, never> => {
    return isUndefinedOrNullOrNotObject(value) || Object.getOwnPropertyNames(value).length === 0;
};
export const isUndefinedOrNullOrNotString = <T>(
    value: T | Undesireable,
): value is Exclude<AllTypes<T>, string> => {
    return isUndefinedOrNull(value) || typeof value !== 'string';
};
export const isUndefinedOrNullOrStringEmpty = <T>(
    value: T | Undesireable,
): value is null | undefined | '' => {
    return isUndefinedOrNullOrNotString(value) || value === '';
};
export const isUndefinedOrNullOrStringEmptyOrZeroOrStringZero = <T>(
    value: T | Undesireable,
): value is null | undefined | '0' | 0 => {
    return isUndefinedOrNullOrNotString(value) || value === '' || value === 0 || value === '0';
};
export const isUndefinedOrNullOrNotBoolean = <T>(
    value: T | Undesireable,
): value is Exclude<AllTypes<T>, boolean> => {
    return isUndefinedOrNull(value) || typeof value !== 'boolean';
};
export const isUndefinedOrNullOrBooleanFalse = <T>(
    value: T | Undesireable,
): value is null | undefined | false => {
    return isUndefinedOrNullOrNotBoolean(value) || value === false;
};
export const isUndefinedOrNullOrNotFunction = <T>(value: unknown): value is AllTypes<T> => {
    return isUndefinedOrNull(value) || typeof value !== 'function';
};
export const isUndefinedOrNullOrNotNumber = <T>(
    value: T | Undesireable,
): value is Exclude<AllTypes<T>, number> => {
    return isUndefinedOrNull(value) || typeof value !== 'number' || Number.isNaN(value);
};
export const isUndefinedOrNullOrNumberZero = <T>(
    value: T | Undesireable,
): value is undefined | null | 0 => {
    return isUndefinedOrNullOrNotNumber(value) || value === 0;
};
export const isUndefinedOrNullOrNotBigNumber = <T>(
    value: T | Undesireable,
): value is Exclude<AllTypes<T>, BigNumber> => {
    return (
        isUndefinedOrNullOrObjectEmpty(value) ||
        isUndefinedOrNullOrBooleanFalse(BigNumber.isBigNumber(value))
    );
};

export const toMili = (hours: number, minutes: number, seconds: number) => {
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};

// eslint-disable-next-line no-promise-executor-return
export const wait = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export const uc = (text: string) => `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

export const NLStyleSheetCreator = <T extends NLStyleSheet>(arg: T): T => {
    return arg;
};

// eslint-disable-next-line no-return-assign
export const safeNavigate = (url: string) => (window.location.href = url);

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenTxnHash(address: Hash, chars = 4): string {
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const sortByField = <T>(array: T[], field: keyof T, asc = true) => {
    const compare = (a: T, b: T) => {
        // eslint-disable-next-line no-nested-ternary
        return asc ? (a[field] < b[field] ? 1 : -1) : a[field] > b[field] ? 1 : -1;
    };
    return array.sort(compare);
};

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// export const unCamelize = (text: string) => {
//     const firstWord = `${text.substr(0, 1).toUpperCase()}${
//         text.substring(1).match(/([a-z])+/g)[0]
//     }`;
//     return `${firstWord}${text
//         .substring(firstWord.length)
//         .match(/([A-Z])*([a-z])*/g)
//         .map((occurence) => ` ${occurence}`)
//         .join('')}`;
// };

// export const cipher = (text: string) => {
//     const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
//     const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
//     const applySaltToChar = (code: any) =>
//         textToChars(config.SALT).reduce((a: any, b: any) => a ^ b, code);

//     return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
// };

// const decipher = (encoded: string) => {
//     let textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
//     let applySaltToChar = (code: any) =>
//         textToChars(config.SALT).reduce((a: any, b: any) => a ^ b, code);

//     return encoded
//         .match(/.{1,2}/g)
//         .map((hex) => parseInt(hex, 16))
//         .map(applySaltToChar)
//         .map((charCode) => String.fromCharCode(charCode))
//         .join('');
// };

// export const loadFromLocalStorage = (target: string, encrypt = true) => {
//     try {
//         const serializedObject = localStorage.getItem(target);

//         if (serializedObject === null) {
//             return undefined;
//         }
//         const res = JSON.parse(encrypt ? serializedObject : serializedObject);
//         return res;
//     } catch (e) {
//         console.log(e);
//         return undefined;
//     }
// };

// export const saveToLocalStorage = (obj: object, target = 'tokens', encrypt = true) => {
//     try {
//         const serializedObject = encrypt ? cipher(JSON.stringify(obj)) : JSON.stringify(obj);
//         localStorage.setItem(target, serializedObject);
//     } catch (e) {
//         console.log('saveToLocalStorage', e);
//     }
// };

export const saveStringToLocalStorage = (str: string, target = 'tokens') => {
    try {
        localStorage.setItem(target, str);
    } catch (e) {
        // console.log(e);
    }
};

export const loadStringFromLocalStorage = (target = 'tokens') => {
    try {
        return localStorage.getItem(target);
    } catch (e) {
        // console.log(e);
        return undefined;
    }
};

export const ucFirst = (value: string) => {
    return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
};

export const smartInsert = <
    T extends {
        index: number;
    },
>(
    array: T[],
    element: T,
): T[] => {
    if (array === undefined) {
        return [element];
    }
    if (element.index === array.length) {
        return [...array, element];
    }
    return array.reduce((acc: T[], elem) => {
        if (elem.index === element.index) {
            acc.push(element);
            // eslint-disable-next-line
            elem.index++;
        }
        if (elem.index >= element.index) {
            // eslint-disable-next-line
            elem.index++;
        }
        acc.push(elem);
        return [...acc, elem];
    }, []);
};

export const smartInsertIndex = <
    T extends {
        index: number;
    },
>(
    array: T[],
    element: T,
) => {
    if (array === undefined) {
        return [element];
    }
    if (element.index === array.length) {
        return [...array, element];
    }
    return array.reduce((acc: T[], elem) => {
        if (elem.index === element.index) {
            acc.push(element);
            // eslint-disable-next-line
            elem.index++;
        }
        if (elem.index >= element.index) {
            // eslint-disable-next-line
            elem.index++;
        }
        acc.push(elem);
        return acc;
    }, []);
};

export const smartRemove = <T extends { index: number }>(array: T[], element: T) => {
    if (array === undefined) {
        return [];
    }
    return array.reduce((acc: T[], elem) => {
        if (elem.index === element.index) {
            return acc;
        }
        if (elem.index > element.index) {
            // eslint-disable-next-line
            elem.index--;
        }
        acc.push(elem);
        return acc;
    }, []);
};

export const smartReplace = <T extends { id: string }>(array: T[], element: Partial<T>) => {
    if (array === undefined) {
        return [];
    }
    return array.reduce((acc: T[], elem) => {
        if (elem.id === element.id) {
            acc.push({
                ...elem,
                ...element,
            });
        } else {
            acc.push(elem);
        }
        return acc;
    }, []);
};

export const toGwei = (num: string): BigNumber => {
    return parseUnits(num, 'gwei');
};

export const safeResetLocalStorage = (keys: string[]) => {
    const values: { key: string; value: string | null | undefined }[] = [];
    keys.forEach((key) => {
        values.push({
            key,
            value: loadStringFromLocalStorage(key),
        });
    });
    localStorage.clear();
    values.forEach((entry) => {
        if (entry.value !== undefined && entry.value !== null) {
            saveStringToLocalStorage(entry.value, entry.key);
        }
    });
};

export const parseTokenId = (itemId: string, long?: boolean) => {
    return long ? itemId.toPrettyId() : itemId.toPrettyId();
};

export const parseTokenIdSmart = (itemId: string) => {
    if (!itemId) return '';
    return itemId.toPrettyId();
};

export const parseItmeIdToNum = (itemId: `item-${string}` | BigNumberish) => {
    const num = +itemId.toString().replace('item-', '');
    return {
        feature: Math.floor(num / 1000),
        position: num % 1000,
    };
};

export const padToAddress = (id: string) => {
    return hexZeroPad(BigNumber.from(id)._hex, 20);
};

export const formatItemSwapIdForSend = (id: string) => {
    const arr = id.split('-');

    return {
        itemId: BigNumber.from(arr[0]),
        sellingNuggId: BigNumber.from(arr[1]),
    };
};
// @ts-ignore
export const fileDelimiter = () => (userAgent.os === 'win32' ? '\\' : '/');

export const shortenPathName = (pathName: string) => {
    const delimiter = fileDelimiter();
    const splitPath = pathName.split(fileDelimiter());
    return `${splitPath.first(2).join(delimiter)}${delimiter}...${delimiter}${splitPath
        .last(2)
        .join(delimiter)}`;
};

export const getFileFromPath = (path: string) => {
    return path.split(fileDelimiter()).last() as unknown as string;
};
export const range = (start: number, end: number) => {
    if (end < start) {
        return [];
    }
    return Array(end - start + 1)
        .fill(0)
        .map((_, idx) => start + idx);
};

export const rangeStart = (start: number, end: number) => {
    if (end < start) {
        return [];
    }
    return Array(end - start)
        .fill(0)
        .map((_, idx) => start + idx);
};
export const rangeEnd = (start: number, end: number) => {
    if (end < start) {
        return [];
    }
    return Array(end - start)
        .fill(0)
        .map((_, idx) => start + 1 + idx);
};

const lib = {
    colors,
    constants,
    conversion,
    fontSize,
    layout,
    parse,
    lodash,
    errors,
    userAgent,
    txdata,
    date,
};

export default lib;
