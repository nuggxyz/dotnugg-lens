/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine } from 'zustand/middleware';

const useStore = create(
    combine(
        {
            infuraKey: '',
            artDir: '',
            mainIsLoading: false,
        },
        (set) => {
            const updateInfuraKey = (key: string) => {
                set(() => {
                    return {
                        infuraKey: key,
                    };
                });
            };

            const updateArtDir = (artDir: string) => {
                set(() => {
                    return {
                        artDir,
                    };
                });
            };

            const updateMainIsLoading = (mainIsLoading: boolean) => {
                set(() => {
                    return {
                        mainIsLoading,
                    };
                });
            };

            return { updateInfuraKey, updateArtDir, updateMainIsLoading };
        },
    ),
);

export default {
    useInfuraKey: () => useStore((data) => data.infuraKey),
    useUpdateInfuraKey: () => useStore((data) => data.updateInfuraKey),
    useArtDir: () => useStore((data) => data.artDir),
    useUpdateArtDir: () => useStore((data) => data.updateArtDir),
    useMainIsLoading: () => useStore((data) => data.mainIsLoading),
    useUpdateMainIsLoading: () => useStore((data) => data.updateMainIsLoading),
    useStore,
};
