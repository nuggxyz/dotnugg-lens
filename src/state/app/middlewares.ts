import { Middleware, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrNotNumber,
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
    loadFromLocalStorage,
    saveToLocalStorage,
} from '../../lib';
import { isUndefinedOrNull } from '../../lib/index';
import { NLState } from '../NLState';

import AppState from '.';

// export const findAndReplaceWith = (value: any) => {
//     if (!isUndefinedOrNullOrObjectEmpty(value)) {
//         const keys = Object.keys(value);
//         keys.forEach((key) => {
//             if (!isUndefinedOrNullOrObjectEmpty(value[key])) {
//                 if ('replaceWith' in value[key]) {
//                     value[key] = value[key]['replaceWith'];
//                 } else {
//                     findAndReplaceWith(value[key]);
//                 }
//             }
//         });
//     }
// };

// const versionCheck: NL.Redux.Middleware<
//     Record<string, unknown>,
//     any,
//     Dispatch<any>
// > =
//     ({ dispatch, getState }) =>
//     (next: any) =>
//     (action) => {
//         console.log(action);
//         if (
//             !isUndefinedOrNull(action.payload) &&
//             !isUndefinedOrNullOrNotNumber(action.payload.currentChain) &&
//             action.payload.currentChain === getState().web3.currentChain
//         ) {
//             console.log('MOVING ON');
//             action.payload = action.payload.replaceWith;
//             return next(action);
//         } else if (
//             action.meta !== undefined &&
//             action.meta.arg.currentChain === getState().web3.currentChain
//         ) {
//             // console.log('MOVING ON');
//             let temp = { ...action };
//             if (!action.type.includes('pending')) {
//                 findAndReplaceWith(temp.payload);
//                 console.log('UPDATED ACTION', temp);
//             }
//             // action.payload = action.meta.arg.replaceWith;
//             return next(temp);
//         }
//         console.log('NOT MOVING ON');
//     };

const logger: NL.Redux.Middleware<
    Record<string, unknown>,
    any,
    Dispatch<any>
> =
    ({ dispatch, getState }) =>
    (next: any) =>
    async (action) => {
        // console.groupCollapsed(action.type);
        // console.log(
        //     '%cPrevious state:',
        //     'color:  #b3bd2d; font-weight: bold',
        //     getState(),
        // );
        console.log(
            '%cAction',
            'color: #6FAAF7; font-weight: bold',
            action.type,
            // action.payload,
        );
        let fin = next(action);
        // console.log(
        //     '%cCurrent state:',
        //     'color: #2bba0b; font-weight: bold;',
        //     getState(),
        // );
        // console.groupEnd();
        return fin;
    };

const localStorager: Middleware<{}, any, Dispatch<any>> =
    ({ dispatch }) =>
    (next: any) =>
    async (action: PayloadAction<NL.Redux.LocalStoragePayload<any>>) => {
        const _ = action.payload;
        let tempAction = action;
        if (
            !isUndefinedOrNullOrObjectEmpty(_) &&
            !isUndefinedOrNullOrStringEmpty(_._localStorageTarget) &&
            !isUndefinedOrNull(_._localStorageValue) &&
            !isUndefinedOrNullOrStringEmpty(_._localStorageExpectedType)
        ) {
            let possibleValue = await loadFromLocalStorage(
                _._localStorageTarget,
            );
            if (_._localStorageExpectedType === 'array') {
                if (!isUndefinedOrNullOrArrayEmpty(possibleValue)) {
                    if (possibleValue.indexOf(_._localStorageValue) === -1) {
                        possibleValue.push(_._localStorageValue);
                    }
                    if (possibleValue.length > 50) {
                        console.log('splicing');
                        possibleValue.splice(0, possibleValue.length - 50);
                    }
                } else if (
                    !isUndefinedOrNullOrArrayEmpty(_._localStorageValue)
                ) {
                    possibleValue = _._localStorageValue;
                } else {
                    possibleValue = [_._localStorageValue];
                }
            } else if (_._localStorageExpectedType === 'object') {
                if (!isUndefinedOrNullOrObjectEmpty(possibleValue)) {
                    possibleValue = {
                        ...possibleValue,
                        ..._._localStorageValue,
                    };
                } else {
                    possibleValue = {
                        ..._._localStorageValue,
                    };
                }
            } else {
                possibleValue = _._localStorageValue;
            }
            await saveToLocalStorage(possibleValue, _._localStorageTarget);

            tempAction.payload = _._localStorageValue;
        } else if (
            !isUndefinedOrNullOrObjectEmpty(_) &&
            !isUndefinedOrNullOrStringEmpty(_._localStorageTarget)
        ) {
            let possibleValue = await loadFromLocalStorage(
                _._localStorageTarget,
            );

            console.log(possibleValue);
            tempAction.payload = possibleValue;
        }

        return next(tempAction);
    };

const rejectedThactions: Middleware<{}, any, Dispatch<any>> =
    ({ getState }) =>
    (next: any) =>
    async (action: PayloadAction<string>) => {
        if (NLState.isRejected(action) && action.payload !== 'GAS_ERROR') {
            const toasts = getState().app.toasts.length;
            AppState.dispatch.addToastToList({
                index: toasts + 1,
                id: `${toasts + 1}`,
                duration: 0,
                error: true,
                loading: false,
                message: action.type,
                title: 'Error',
            });
        }

        return next(action);
    };

export default {
    localStorager,
    rejectedThactions,
    logger,
};
