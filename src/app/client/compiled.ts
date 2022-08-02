/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';
import React from 'react';
import { Byter } from '@nuggxyz/dotnugg-sdk/dist/builder/types/EncoderTypes';
import { BaseContract } from '@ethersproject/contracts';
import { InfuraProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import invariant from 'tiny-invariant';
import { Document } from '@nuggxyz/dotnugg-sdk/dist/builder/types/TransformTypes';
import shallow from 'zustand/shallow';
import Bluebird from 'bluebird';

import { DotnuggV1, DotnuggV1__factory } from '@src/app/typechain';
import web3 from '@src/app/web3';

export type Item = Remap<Output & { title: string | undefined }>;

const contract = new BaseContract(
    web3.constants.DEFAULT_CONTRACTS.DotnuggV1,
    DotnuggV1__factory.abi,
) as unknown as DotnuggV1;

const breakup = (input: BigNumber): BigNumber[] => {
    let len = ethers.utils.hexDataLength(input._hex);

    let res: BigNumber[] = [];

    while (len > 0) {
        res.push(
            ethers.BigNumber.from(
                ethers.utils.hexDataSlice(input._hex, len >= 32 ? len - 32 : 0, len),
            ),
        );
        len -= 32;
    }

    res = res.reverse();

    return res;
};

const strarr = (input: Item['bits']): BigNumber => {
    // console.log('----------------');
    return [...input].reverse().reduce((prev, curr) => {
        invariant(
            curr.dat < 2 ** curr.bit && curr.dat >= 0,
            `ENCODE:STRARR:0 - ${curr.dat} < ${2 ** curr.bit}`,
        );
        // if (curr.nam && !curr.nam.includes('MATRIX')) console.log(curr.nam, curr.bit, curr.dat);
        if (prev.eq(0)) {
            prev = ethers.BigNumber.from(curr.dat);
        } else {
            prev = prev.shl(curr.bit).or(curr.dat);
        }
        return prev;
    }, ethers.BigNumber.from(0));
};

const build = (input: Item['bits']): BigNumber[] => {
    return breakup(strarr(input));
};

const useStore = create(
    persist(
        combine(
            {
                recents: [] as { fileUri: string; time: number }[],
                infuraKey: web3.constants.INFURA_KEY,
                artDir: '',
                items: {} as Record<string, Item>,
                selected: [null, null, null, null, null, null, null, null] as FixedLengthArray<
                    string | null,
                    8
                >,
                selectedFeature: 0,
                svg: null as string | null,
                loading: false,
                mainLoading: false,
                document: null as Document | null,
                featureNames: [null, null, null, null, null, null, null, null] as FixedLengthArray<
                    string | null,
                    8
                >,
                images: {} as { [_: string]: { svg: string; mTimeMs: number } | undefined },
            },
            (set, get) => {
                const udpate = (items: Item[], document: Document) => {
                    const currItems = get().items;

                    const updated: Item[] = [];
                    items.forEach((element) => {
                        const currItem = currItems[element.fileUri];
                        if (
                            !element.mtimeMs ||
                            !currItem?.mtimeMs ||
                            element.mtimeMs !== currItem.mtimeMs
                        ) {
                            updated.push(element);
                        }
                    });
                    set(() => {
                        return {
                            items: items.reduce((prev, curr) => {
                                return { ...prev, [curr.fileUri]: curr };
                            }, {}),
                            document,
                            featureNames: Object.keys(
                                document.collection.features,
                            ).reverse() as unknown as FixedLengthArray<string | null, 8>,
                        };
                    });

                    void combo();

                    void Bluebird.Promise.map(
                        updated,
                        async (element) => {
                            await single(element);
                        },
                        { concurrency: 1000 },
                    );
                };

                const updateSelectedFeature = (selectedFeature: number) => {
                    set(() => ({
                        selectedFeature,
                    }));
                };

                const select = (itemUri: string) => {
                    const item = get().items[itemUri];
                    if (item) {
                        // @ts-ignore
                        set((data) => {
                            data.selected[item.feature] = item.fileUri;
                            data.recents.filterInPlace((x) => x.fileUri !== item.fileUri);
                            data.recents.unshift({
                                fileUri: item.fileUri,
                                time: new Date().getTime(),
                            });

                            if (data.recents.length > 50) {
                                data.recents.pop();
                            }
                        });

                        void combo();
                    }
                };

                const deselect = (itemUri: string) => {
                    const item = get().items[itemUri];

                    if (item && get().selected[item.feature]) {
                        // @ts-ignore
                        set((data) => {
                            data.selected[item.feature] = null;
                        });

                        void combo();
                    }
                };

                const single = async (item: Item) => {
                    if (!item) return;

                    const check = get().images[item.fileUri];

                    if (check && item.mtimeMs === check.mTimeMs) return;

                    // @ts-ignore
                    set((data) => {
                        data.images[item.fileUri] = undefined;
                    });

                    const payload = [build(item.bits)];

                    await contract
                        .connect(new InfuraProvider(web3.constants.DEFAULT_CHAIN, get().infuraKey))
                        .combo(
                            payload,

                            true,
                        )
                        .then((svg) => {
                            // @ts-ignore
                            set((data) => {
                                data.images[item.fileUri] = {
                                    svg,
                                    mTimeMs: item.mtimeMs ?? 0,
                                };
                            });
                        })
                        .catch((e) => {
                            return new Error(e as string);
                        });
                };

                const combo = async () => {
                    set(() => ({
                        loading: true,
                    }));
                    const items = get()
                        .selected.map((x) => {
                            if (x) return get().items[x].bits;
                            return null;
                        })
                        .filter((x) => x) as Byter[][];

                    const payload = items.map((item) => build(item));

                    await contract
                        .connect(new InfuraProvider(web3.constants.DEFAULT_CHAIN, get().infuraKey))
                        .combo(
                            payload,

                            true,
                        )
                        .then((svg) => {
                            set(() => ({
                                svg,
                            }));
                        })
                        .catch((e) => {
                            return new Error(e as string);
                        });
                    set(() => ({
                        loading: false,
                    }));
                };

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
                const updateMainLoading = (mainLoading: boolean) => {
                    set(() => {
                        return {
                            mainLoading,
                        };
                    });
                };
                return {
                    udpate,
                    select,
                    deselect,
                    combo,
                    updateInfuraKey,
                    updateArtDir,
                    updateMainLoading,
                    updateSelectedFeature,
                };
            },
        ),
        {
            name: 'dotnugg-lens-compiled',
            version: 2,
            partialize: (x) => {
                return {
                    artDir: x.artDir,
                    infuraKey: x.infuraKey,
                    images: x.images,
                    recents: x.recents,
                };
            },
        },
    ),
);

export const useCompilerUpdater = () => {
    const infuraKey = useStore((data) => data.infuraKey);
    const artDir = useStore((data) => data.artDir);
    React.useEffect(() => {
        if (artDir && infuraKey) {
            window.dotnugg.createCompiler(
                artDir,
                web3.constants.DEFAULT_CONTRACTS.DotnuggV1,
                infuraKey,
            );
        }
    }, [artDir, infuraKey]);
    return null;
};

export default {
    useFeautureNames: () => useStore((data) => data.featureNames, shallow),
    useItemSvg: (fileUri?: string | null) =>
        useStore(
            React.useCallback((data) => (fileUri ? data.images[fileUri] : undefined), [fileUri]),
        ),
    useDocument: () => useStore((data) => data.document),
    useSelectedFeature: () => useStore((data) => data.selectedFeature),
    useUpdateSelectedFeature: () => useStore((data) => data.updateSelectedFeature),

    useInfuraKey: () => useStore((data) => data.infuraKey),
    useUpdateInfuraKey: () => useStore((data) => data.updateInfuraKey),
    useArtDir: () => useStore((data) => data.artDir),
    useUpdateArtDir: () => useStore((data) => data.updateArtDir),
    useCompiledItem: (fileUri?: string | null) =>
        useStore(
            React.useCallback((data) => (fileUri ? data.items[fileUri] : undefined), [fileUri]),
        ),
    useSelectedFileUris: () => useStore((data) => data.selected),
    useRecents: () => useStore((data) => data.recents),

    useCombo: () => useStore((data) => data.combo),
    useSvg: () => useStore((data) => data.svg),

    useCompiledItems: () => useStore((data) => data.items),
    useSelect: () => useStore((data) => data.select),
    useDeselect: () => useStore((data) => data.deselect),
    useLoading: () => useStore((data) => data.loading),
    useSetMainLoading: () => useStore((data) => data.updateMainLoading),
    useMainLoading: () => useStore((data) => data.mainLoading),
    // useClearPersist: () => () => useStore.persist.clearStorage(),
    useStore,
};
