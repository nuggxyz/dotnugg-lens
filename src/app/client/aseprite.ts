/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine } from 'zustand/middleware';

export type Layer = {
    path: string;
    compiled: boolean;
    loading: boolean;
};

const useStore = create(
    combine(
        {
            layers: [] as Layer[],
            path: null as string | null,
            error: null as { message: string; file: string | null } | null,
            success: false,
        },
        (set, get) => {
            const onLayersFound = (path: string, layers: Layer[]) => {
                set(() => {
                    return {
                        layers,
                        path,
                        error: null,
                    };
                });
            };

            const convert = (artDir: string) => {
                const { path } = get();
                if (!path) return;

                const id = new Date().getTime().toString();

                window.dotnugg.convertAseprite(path, artDir, id, '_');

                // get().layers.forEach((layer) => {
                //     window.dotnugg.convertAseprite(path, artDir, id, layer.path);
                // });
            };

            const onError = (file: string, error: string) => {
                set(() => {
                    return {
                        layers: [],
                        path: null,
                        error: {
                            file,
                            message: error,
                        },
                    };
                });
            };

            const onSuccess = () => {
                set(() => {
                    return {
                        success: true,
                    };
                });
            };

            const onClear = () => {
                set(() => {
                    return {
                        layers: [],
                        path: null,
                        error: null,
                        success: false,
                    };
                });
            };

            return { onLayersFound, onError, convert, onSuccess, onClear };
        },
    ),
);

export default {
    useLayers: () => useStore((x) => x.layers),
    useError: () => useStore((x) => x.error),
    usePath: () => useStore((x) => x.path),
    useConvert: () => useStore((x) => x.convert),
    // useOnSuccess: () => useStore((x) => x.onSuccess),
    useOnClear: () => useStore((x) => x.onClear),
    useOnError: () => useStore((x) => x.onError),
    useSuccess: () => useStore((x) => x.success),

    useStore,
};
