/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine } from 'zustand/middleware';

import { smartInsertIndex, smartRemove, smartReplace } from '@src/app/lib';
import { ToastType } from '@src/app/interfaces/toasts';

const store = create(
    combine(
        {
            list: [] as ToastType[],
        },
        (set) => {
            const addToast = (toast: ToastType) => {
                set((state) => {
                    return {
                        list: smartInsertIndex([...state.list], toast),
                    };
                });
            };

            const removeToast = (toast: ToastType) => {
                set((state) => {
                    return {
                        list: smartRemove([...state.list], toast),
                    };
                });
            };

            const replaceToast = (toast: Partial<ToastType>) => {
                set((state) => {
                    return {
                        list: smartReplace([...state.list], toast),
                    };
                });
            };

            return { addToast, removeToast, replaceToast };
        },
    ),
);

export type ToastState = ReturnType<typeof store['getState']>;

export default {
    useList: () => store((state) => state.list),
    useAddToast: () => store((state) => state.addToast),
    useRemoveToast: () => store((state) => state.removeToast),
    useReplaceToast: () => store((state) => state.replaceToast),
    ...store,
};
