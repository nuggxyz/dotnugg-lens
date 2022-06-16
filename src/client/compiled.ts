/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine } from 'zustand/middleware';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';
import React from 'react';

export type Item = Remap<{
    title: string;
    items: Remap<Output & { svg: string; title: string | undefined }>[];
}>;

const useStore = create(
    combine(
        {
            items: [] as Item[],
        },
        (set) => {
            const udpate = (items: Item[]) => {
                console.log({ items });
                set(() => {
                    return {
                        items,
                    };
                });
            };

            return { udpate };
        },
    ),
);

const useCompiledItem = (fileUri: string): Item['items'][number] | undefined => {
    const items = useStore((data) => data.items);

    return React.useMemo(() => {
        for (let j = 0; j < items.length; j++) {
            for (let i = 0; i < items[j].items.length; i++) {
                if (items[j].items[i].fileUri === fileUri) {
                    return items[j].items[i];
                }
            }
        }
        return undefined;
    }, [items, fileUri]);
};

const useCompiledItems = (fileUris: string[]): Item['items'][number][] => {
    const items = useStore((data) => data.items);

    return React.useMemo(() => {
        const arr = [] as (Output & {
            svg: string;
            title: string | undefined;
        })[];
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

export default {
    useCompiledItem,
    useCompiledItems,
    useAllCompiledItems: () => useStore((data) => data.items),
    useStore,
};
