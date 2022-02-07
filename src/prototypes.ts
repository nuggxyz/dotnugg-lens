import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrNotNumber,
    isUndefinedOrNullOrNumberZero,
    isUndefinedOrNullOrObjectEmpty,
} from './lib';

Array.prototype.first = function (count?: number) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [];
    }

    if (isUndefinedOrNullOrNotNumber(count)) {
        return this[0];
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

Array.prototype.toggle = function <T extends { id: string }>(
    element: T,
    field?: string,
) {
    const val = [...this];
    if (isUndefinedOrNullOrArrayEmpty(val)) {
        return [element];
    }

    const index = val.findIndex((item: T) =>
        field ? item[field] === element[field] : item.id === element.id,
    );

    if (!isUndefinedOrNullOrNotNumber(index) && index >= 0) {
        val.splice(index, 1);
    } else {
        val.push(element);
    }
    return val;
};

Array.prototype.insert = function <T extends { index: number }>(element: T) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [element];
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

Array.prototype.remove = function <T extends { index: number }>(element: T) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [];
    }
    return this.reduce((acc, elem) => {
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

Array.prototype.replace = function <T extends { id: string }>(element: T) {
    if (isUndefinedOrNullOrArrayEmpty(this)) {
        return [];
    }
    return this.reduce((acc, elem) => {
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
