/* eslint-disable no-param-reassign */
import create from 'zustand';
import { combine } from 'zustand/middleware';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';
import React from 'react';
import { Byter } from '@nuggxyz/dotnugg-sdk/dist/builder/types/EncoderTypes';
import { BaseContract } from '@ethersproject/contracts';
import { InfuraProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import invariant from 'tiny-invariant';

import { DotnuggV1, DotnuggV1__factory } from '@src/typechain';
import web3 from '@src/web3';

export type Item = Remap<Output & { svg: string; title: string | undefined }>;

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
            prev.shl(curr.bit).or(curr.dat);
        }
        return prev;
    }, ethers.BigNumber.from(0));
};

const build = (input: Item['bits']): BigNumber[] => {
    return breakup(strarr(input));
};

const useStore = create(
    combine(
        {
            infuraKey: '',
            artDir: '',
            items: {} as Record<string, Item>,
            selected: [null, null, null, null, null, null, null, null] as FixedLengthArray<
                string | null,
                8
            >,
            svg: null as string | null,
            loading: false,
            mainLoading: false,
        },
        (set, get) => {
            const udpate = (items: Item[]) => {
                set(() => {
                    return {
                        items: items.reduce((prev, curr) => {
                            return { ...prev, [curr.fileUri]: curr };
                        }, {}),
                    };
                });
            };

            const select = (itemUri: string) => {
                const item = get().items[itemUri];
                if (item) {
                    // @ts-ignore
                    set((data) => {
                        data.selected[item.feature] = item.fileUri;
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

                await contract
                    .connect(new InfuraProvider(web3.constants.DEFAULT_CHAIN, get().infuraKey))
                    .combo(
                        items.map((item) => build(item)),

                        true,
                    )
                    .then((svg) => {
                        set(() => ({
                            svg,
                        }));
                    })
                    .catch((e) => alert(e))
                    .finally(() =>
                        set(() => ({
                            loading: false,
                        })),
                    );
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
            };
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
    useInfuraKey: () => useStore((data) => data.infuraKey),
    useUpdateInfuraKey: () => useStore((data) => data.updateInfuraKey),
    useArtDir: () => useStore((data) => data.artDir),
    useUpdateArtDir: () => useStore((data) => data.updateArtDir),
    useCompiledItem: (fileUri?: string | null) =>
        useStore(
            React.useCallback((data) => (fileUri ? data.items[fileUri] : undefined), [fileUri]),
        ),
    useSelectedFileUris: () => useStore((data) => data.selected),

    useCombo: () => useStore((data) => data.combo),
    useSvg: () => useStore((data) => data.svg),

    useCompiledItems: () => useStore((data) => data.items),
    useSelect: () => useStore((data) => data.select),
    useDeselect: () => useStore((data) => data.deselect),
    useLoading: () => useStore((data) => data.loading),
    useSetMainLoading: () => useStore((data) => data.updateMainLoading),
    useMainLoading: () => useStore((data) => data.mainLoading),
    useStore,
};
