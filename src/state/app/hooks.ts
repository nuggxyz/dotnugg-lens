import React from 'react';

import { Item } from '../ipcListeners';

import AppState from '.';

const useCompiledItem = (
    fileUri: string,
): Item['items'][number] | undefined => {
    const items = AppState.select.compiledItems();

    return React.useMemo(() => {
        items.forEach((a) => {
            a.items.forEach((b) => {
                if (b.fileUri === fileUri) {
                    return b;
                }
            });
        });
        return undefined;
    }, [items, fileUri]);
};

const useCompiledItems = (fileUris: string[]): Item['items'][number][] => {
    const items = AppState.select.compiledItems();

    return React.useMemo(() => {
        const arr = [];
        items.forEach((a) => {
            a.items.forEach((b) => {
                const index = fileUris.findIndex((x) => x === b.fileUri);
                if (index !== -1) {
                    arr[index] = b;
                }
            });
        });
        return arr;
    }, [items, fileUris]);
};

export default { useCompiledItem, useCompiledItems };
