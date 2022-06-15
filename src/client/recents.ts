/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine, persist } from 'zustand/middleware';

const useStore = create(
    persist(
        combine(
            {
                items: [] as { fileUri: string; time: number }[],
            },
            (set) => {
                const push = (fileUri: string) => {
                    // @ts-ignore
                    set((data) => {
                        data.items.push({ fileUri, time: new Date().getTime() });
                    });
                };

                return { push };
            },
        ),
        { name: 'dotnugg-lens-recents' },
    ),
);

export default {
    usePushToRecents: () => useStore((data) => data.push),
    useRecents: () => useStore((data) => data.items),
};
