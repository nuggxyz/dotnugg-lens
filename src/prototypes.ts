/* eslint-disable no-param-reassign */
/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrNotNumber,
    isUndefinedOrNullOrStringEmpty,
} from './lib';

// eslint-disable-next-line @typescript-eslint/unbound-method
// const _getBBox = SVGGraphicsElement.prototype.getBBox;

// SVGGraphicsElement.prototype.getBBox = function fn() {
//     let tempSvg: Node;
//     if (document.contains(this)) {
//         return _getBBox.apply(this);
//     }
//     const tempDiv = document.createElement('div');
//     tempDiv.setAttribute('style', 'position:absolute; visibility:hidden; width:0; height:0');
//     if (this.tagName === 'svg') {
//         tempSvg = this.cloneNode(true);
//     } else {
//         tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//         tempSvg.appendChild(this.cloneNode(true));
//     }
//     tempDiv.appendChild(tempSvg);
//     document.body.appendChild(tempDiv);
//     const bbox = _getBBox.apply(tempSvg);
//     document.body.removeChild(tempDiv);
//     return bbox;
// };

export const buildTokenIdFactory = <A extends { tokenId: TokenId }>(input: A) => {
    const yo = {
        type: (input.tokenId.isItemId() ? ('item' as const) : ('nugg' as const)) as PickFromTokenId<
            A['tokenId'],
            'nugg',
            'item'
        >,
        isItem: () => input.tokenId.isItemId(),
        isNugg: () => input.tokenId.isNuggId(),
        ...input,
    };

    return yo as Remap<typeof yo>;
};

// @ts-ignore
String.prototype.onlyTokenId = function fn(input: `nugg` | `item`) {
    if (this.isTokenId(input)) return this;
    return undefined;
};

Number.prototype.toTokenId = function fn(input: `nugg` | `item`) {
    return ((_input: number, pre: `nugg` | `item`) => {
        return `${pre}-${Number(_input)}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(this as number, input) as unknown as any;
};

String.prototype.toTokenId = function fn(input: `nugg` | `item`) {
    return ((_input: string, pre: `nugg` | `item`) => {
        return `${pre}-${Number(_input)}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(this as string, input) as unknown as any;
};

String.prototype.isTokenId = function fn(input: `nugg` | `item`) {
    return ((_input: string, pre: `nugg` | `item`) => {
        return _input.startsWith(`${pre}-`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(this as string, input) as unknown as any;
};

String.prototype.toPrettyId = function fn() {
    const raw = this.toRawIdNum();

    if (this.isItemId()) {
        return `${
            ['Base', 'Eyes', 'Mouth', 'Hair', 'Hat', 'Back', 'Neck', 'Hold'][Math.floor(raw / 1000)]
        } ${raw % 1000}`;
    }
    if (this.isNuggId()) {
        const prefix = ['G', 'M'][Math.floor(raw / 1000000)];
        return `Nugg ${raw % 1000000}${prefix}`;
    }
    return this as string;
};

String.prototype.isItemId = function fn() {
    return this.isTokenId('item');
};
String.prototype.isHash = function fn() {
    return this.startsWith('0x');
};
String.prototype.isNuggId = function fn() {
    return this.isTokenId('nugg');
};

String.prototype.toItemId = function fn() {
    return this.toTokenId('item');
};

String.prototype.toNuggId = function fn() {
    return this.toTokenId('nugg');
};

String.prototype.onlyItemId = function fn() {
    return this.onlyTokenId('item');
};
String.prototype.onlyNuggId = function fn() {
    return this.onlyTokenId('nugg');
};
// @ts-ignore
String.prototype.toRawId = function fn() {
    return ((_input: TokenId): typeof _input extends TokenId ? string : never => {
        if (this.startsWith('item-')) return this.replace('item-', '');
        if (this.startsWith('nugg-')) return this.replace('nugg-', '');
        return '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(this as TokenId);
};

String.prototype.toRawIdNum = function fn() {
    return +this.toRawId();
};

Number.prototype.toItemFeature = function fn() {
    return Math.floor(Number(this) / 1000) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

Number.prototype.toItemPosition = function fn() {
    return Number(this) % 1000;
};

Number.prototype.toItemId = function fn() {
    return this.toTokenId('item');
};

Number.prototype.toNuggId = function fn() {
    return ((input: number) => {
        return `nugg-${Number(input)}`;
    })(this as number) as NuggId;
};

String.prototype.equals = function fn(other: string) {
    return this === other;
};

Array.prototype.mergeInPlace = function fn<T>(
    incomingData: Array<T>,
    keyFeild: keyof T,
    shouldOverride: (a: T, b: T) => boolean,
    sort: (a: T, b: T) => number,
) {
    const map = new Map<T[keyof T], number>();

    (this as Array<T>).forEach((x, i) => {
        map.set(x[keyFeild], i);
    });

    const unseen: T[] = [];

    incomingData.forEach((x) => {
        const check = map.get(x[keyFeild]);
        if (check === undefined) {
            unseen.push(x);
        } else if (shouldOverride((this as Array<T>)[check], x)) {
            (this as Array<T>)[check] = x;
        }
    });

    this.unshift(...unseen);
    if (sort) this.sort(sort);
};
Array.prototype.mergeInPlaceReturnRef = function fn(...args) {
    this.mergeInPlace(...args);

    return this;
};
Array.prototype.merge = function fn(...args) {
    const updatedref = [...this];

    updatedref.mergeInPlace(...args);

    return updatedref;
};

Array.prototype.mergeInPlaceNoUpdateNoChange = function fn(
    ...args: Parameters<typeof Array.prototype.mergeInPlace>
) {
    const holdMe = this as typeof args[0];

    const before = JSON.stringify(holdMe);

    Array.prototype.mergeInPlace.call(holdMe, args[0], args[1], args[2], args[3]);

    const after = JSON.stringify(holdMe);

    if (before !== after) this.mergeInPlace(...args);
};

Array.prototype.shuffle = function fn() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
};

Array.prototype.filterInPlace = function fn(callbackfn, thisArg) {
    let ptr = 0;

    this.forEach((element, index) => {
        if (callbackfn.call(thisArg, element, index, this)) {
            if (index !== ptr) this[ptr] = element;
            ptr++;
        }
    }, this);

    this.length = ptr;
};

Array.prototype.first = function fn(count: number) {
    if (!this || this.length === 0) {
        return undefined;
    }

    if (count === undefined) {
        return this.length > 0 ? this[0] : undefined;
    }

    return this.slice(0).reduce((result, element, i, arr) => {
        if (result.length < count) {
            result.push(element);
        } else {
            arr.splice(1);
        }
        return result;
    }, []);
};

Array.prototype.last = function fn(count?: number) {
    if (!this || this.length === 0) {
        return undefined;
    }

    if (count === undefined) {
        return this[this.length - 1];
    }

    return this.slice(0)
        .reverse()
        .reduce((result, element, i, arr) => {
            if (result.length < count) {
                result.push(element);
            } else {
                arr.splice(1);
            }
            return result;
        }, [])
        .reverse();
};

Array.prototype.toggle = function fn<T>(element: T, field?: keyof T) {
    const val = [...this];
    if (isUndefinedOrNullOrArrayEmpty(val)) {
        return [element];
    }

    const index = val.findIndex((item: T) =>
        field ? item[field] === element[field] : item === element,
    );

    if (!isUndefinedOrNullOrNotNumber(index) && index >= 0) {
        val.splice(index, 1);
    } else {
        val.push(element);
    }
    return val;
};

Array.prototype.insert = function fn<T extends { index: number }>(element: T) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [element];
    }
    if (typeof element === 'string') {
        if (this.indexOf(element) !== -1) {
            return this;
        }
        return [...this, element];
    }
    if (element.index === this.length) {
        return [...this, element];
    }
    return this.reduce((acc, elem) => {
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

Array.prototype.remove = function fn<T extends { index: number }>(element: T) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [];
    }
    if (typeof element === 'string') {
        const temp = [...this];
        temp.splice(
            this.findIndex((item) => element === item),
            1,
        );
        return temp;
    }
    return this.reduce((acc, elem) => {
        if (elem.index === element.index) {
            return acc;
        }
        if (elem.index >= element.index) {
            elem.index--;
        }
        acc.push(elem);
        return acc;
    }, []);
};

Array.prototype.replace = function fn<T extends { id: string } | object>(
    element: T,
    field: keyof T,
) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [];
    }
    return this.reduce((acc, elem) => {
        if (
            !isUndefinedOrNullOrStringEmpty(field)
                ? elem[field] === element[field]
                : elem.id === (element as { id: string }).id
        ) {
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

Array.prototype.smartInsert = function fn<T>(element: T, field?: keyof T) {
    if (
        !this.find((item) =>
            field !== undefined ? item[field] === element[field] : item === element,
        )
    ) {
        return [...this, element];
    }
    return this;
};

Array.prototype.smartRemove = function fn<T>(element: T, field?: keyof T) {
    const index = this.findIndex((item) =>
        field !== undefined ? item[field] === element[field] : item === element,
    );
    if (index === -1) {
        return this;
    }
    const temp = [...this];
    temp.splice(index, 1);
    return temp;
};
