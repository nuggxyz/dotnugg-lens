import { getAddress } from '@ethersproject/address';
import { BytesLike, ethers } from 'ethers';

import config from '../config';
// 6287103
// VERIFICATION
export const isAnybodyThere = (value: any) => {
    try {
        if (!isUndefinedOrNull(value)) return true;
        return false;
    } catch {
        return false;
    }
};
export const isUndefined = (value: any) => {
    return typeof value === 'undefined';
};
export const isUndefinedOrNull = (value: any) => {
    return isUndefined(value) || value === null;
};
export const isUndefinedOrNullOrNotArray = (value: any) => {
    return isUndefinedOrNull(value) || !Array.isArray(value);
};
export const isUndefinedOrNullOrArrayEmpty = (value: any) => {
    return isUndefinedOrNullOrNotArray(value) || value.length === 0;
};
export const isUndefinedOrNullOrNotObject = (value: any) => {
    return isUndefinedOrNull(value) || typeof value !== 'object';
};
export const isUndefinedOrNullOrObjectEmpty = (value: any) => {
    return (
        isUndefinedOrNullOrNotObject(value) ||
        Object.getOwnPropertyNames(value).length === 0
    );
};
export const isUndefinedOrNullOrNotString = (value: any) => {
    return isUndefinedOrNull(value) || typeof value !== 'string';
};
export const isUndefinedOrNullOrStringEmpty = (value: any) => {
    return isUndefinedOrNullOrNotString(value) || value === '';
};
export const isUndefinedOrNullOrStringEmptyOrZeroOrStringZero = (
    value: any,
) => {
    return (
        isUndefinedOrNullOrNotString(value) ||
        value === '' ||
        value === 0 ||
        value === '0'
    );
};
export const isUndefinedOrNullOrNotBoolean = (value: any) => {
    return isUndefinedOrNull(value) || typeof value !== 'boolean';
};
export const isUndefinedOrNullOrBooleanFalse = (value: any) => {
    return isUndefinedOrNullOrNotBoolean(value) || value === false;
};
export const isUndefinedOrNullOrNotFunction = (value: any) => {
    return isUndefinedOrNull(value) || typeof value !== 'function';
};
export const isUndefinedOrNullOrNotNumber = (value: any) => {
    return (
        isUndefinedOrNull(value) || typeof value !== 'number' || isNaN(value)
    );
};
export const isUndefinedOrNullOrNumberZero = (value: any) => {
    return isUndefinedOrNullOrNotNumber(value) || value === 0;
};

export const toMili = (hours: number, minutes: number, seconds: number) => {
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};

export const wait = (timeout: number) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

export const uc = (text: string) =>
    `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;

export const NLStyleSheetCreator = <T extends NLStyleSheet>(arg: T): T => {
    return arg;
};

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
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
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
        42 - chars,
    )}`;
}

export function shortenTxnHash(address: string, chars = 4): string {
    return `${address.substring(0, chars + 2)}...${address.substring(
        address.length - chars,
    )}`;
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const sortByField = <T>(
    array: T[],
    field: keyof T,
    asc: boolean = true,
) => {
    const compare = (a: T, b: T) => {
        return asc
            ? a[field] < b[field]
                ? 1
                : -1
            : a[field] > b[field]
            ? 1
            : -1;
    };
    return array.sort(compare);
};

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const unCamelize = (text: string) => {
    const firstWord = `${text.substr(0, 1).toUpperCase()}${
        text.substring(1).match(/([a-z])+/g)[0]
    }`;
    return `${firstWord}${text
        .substring(firstWord.length)
        .match(/([A-Z])*([a-z])*/g)
        .map((occurence) => ` ${occurence}`)
        .join('')}`;
};

export const cipher = (text: string) => {
    let textToChars = (text: any) =>
        text.split('').map((c: any) => c.charCodeAt(0));
    let byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
    let applySaltToChar = (code: any) =>
        textToChars(config.SALT).reduce((a: any, b: any) => a ^ b, code);

    return text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
};

const decipher = (encoded: string) => {
    let textToChars = (text: any) =>
        text.split('').map((c: any) => c.charCodeAt(0));
    let applySaltToChar = (code: any) =>
        textToChars(config.SALT).reduce((a: any, b: any) => a ^ b, code);

    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join('');
};

export const loadFromLocalStorage = (target: string, encrypt = true) => {
    try {
        const serializedObject = window.localStorage.getItem(target);

        if (serializedObject === null) {
            return undefined;
        }
        let res = JSON.parse(
            encrypt ? decipher(serializedObject) : serializedObject,
        );
        return res;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const saveToLocalStorage = (
    obj: object,
    target: string = 'tokens',
    encrypt = true,
) => {
    try {
        const serializedObject = encrypt
            ? cipher(JSON.stringify(obj))
            : JSON.stringify(obj);
        window.localStorage.setItem(target, serializedObject);
    } catch (e) {
        console.log('saveToLocalStorage', e);
    }
};

export const saveStringToLocalStorage = (
    str: string,
    target: string = 'tokens',
) => {
    try {
        window.localStorage.setItem(target, str);
    } catch (e) {
        console.log(e);
    }
};

export const loadStringFromLocalStorage = (target: string = 'tokens') => {
    try {
        return window.localStorage.getItem(target);
    } catch (e) {
        console.log(e);
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
) => {
    if (isUndefinedOrNullOrArrayEmpty(array)) {
        return [element];
    }
    if (element.index === array.length) {
        return [...array, element];
    }
    return array.reduce((acc, elem) => {
        if (elem.index === element.index) {
            acc.push(element);
            elem.index++;
        }
        if (elem.index >= element.index) {
            elem.index++;
        }
        acc.push(elem);
        return acc;
    }, []);
};

export const smartRemove = <T extends { index: number }>(
    array: T[],
    element: T,
) => {
    if (isUndefinedOrNullOrArrayEmpty(array)) {
        return [];
    }
    return array.reduce((acc, elem) => {
        if (elem.index === element.index) {
            return acc;
        }
        if (elem.index > element.index) {
            elem.index--;
        }
        acc.push(elem);
        return acc;
    }, []);
};

export const smartReplace = <T extends { id: string }>(
    array: T[],
    element: T,
) => {
    if (isUndefinedOrNullOrArrayEmpty(array)) {
        return [];
    }
    return array.reduce((acc, elem) => {
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

export const toGwei = (num: string): ethers.BigNumber => {
    return ethers.utils.parseUnits(num, 'gwei');
};
