import React, { FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import { IoClose, IoSync } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import lib, { isUndefinedOrNullOrArrayEmpty, isUndefinedOrNullOrStringEmpty } from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import FadeInOut from '@src/components/general/FadeInOut/FadeInOut';
import Loader from '@src/components/general/Loader/Loader';
import Text from '@src/components/general/Texts/Text/Text';
import usePrevious from '@src/hooks/usePrevious';
import Label from '@src/components/general/Label/Label';
import { useDotnuggV1 } from '@src/contracts/useContract';
import client from '@src/client';
import { Item } from '@src/client/compiled';

import styles from './NuggAssembler.styles';

type Props = {
    selectedItems: Item['items'][number][];
    setSelectedItems: React.Dispatch<SetStateAction<Item['items'][number][]>>;
};

const DetailView: FunctionComponent<Props> = ({ selectedItems, setSelectedItems }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = React.useState('');
    const [loading, setLoading] = useState(false);
    // const isZoomOn = AppState.select.isZoomOn();
    // const { height } = AppState.select.dimensions();
    const artRepo = client.keys.useArtDir();
    const dotnugg = useDotnuggV1();

    const liveSelectedItems = client.compiled.useCompiledItems(selectedItems.map((x) => x.fileUri));

    const prev = usePrevious(liveSelectedItems);

    const refresh = React.useCallback(() => {
        if (!isUndefinedOrNullOrArrayEmpty(liveSelectedItems)) {
            if (JSON.stringify(prev) !== JSON.stringify(liveSelectedItems)) {
                setLoading(true);
                console.log({ liveSelectedItems });
                const tmp = liveSelectedItems;
                dotnugg
                    .combo(
                        [
                            ...tmp
                                .sort((a, b) => (a.feature < b.feature ? -1 : 1))
                                .map((item) => window.dotnugg.getHex(item, artRepo)),
                            /// ////// bad ////////
                            // [],
                            // [],
                            /// ////// good ////////
                            // [],
                            // [],
                        ],
                        true,
                    )
                    .then((_svg) => setSvg(_svg))
                    .catch((e) => alert(e))
                    .finally(() => setLoading(false));
                // scrollRef.current.scrollTo(scrollRef.current.scrollWidth, 0);
            }
        }
    }, [liveSelectedItems, artRepo, setLoading, prev]);

    useEffect(() => {
        refresh();
    }, [liveSelectedItems, refresh]);

    // useEffect(() => {
    //     if (scrollRef.current) {
    //         const { current } = scrollRef;
    //         const listener = (evt) => {
    //             console.log(evt.deltaY);
    //             current.scrollLeft += evt.deltaY;
    //         };
    //         current.addEventListener('wheel', listener);
    //         return () => {
    //             current.removeEventListener('wheel', listener);
    //         };
    //     }
    // }, [scrollRef.current]);

    return !isUndefinedOrNullOrArrayEmpty(selectedItems) ? (
        <div style={styles.detailContainer}>
            <div
                style={{
                    zIndex: 2,
                    width: '100%',
                    height: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                {!isUndefinedOrNullOrStringEmpty(svg) && (
                    <img
                        src={svg}
                        style={{
                            width: '90%',
                        }}
                        alt="fix"
                    />
                )}
            </div>
            <div style={{ position: 'relative' }}>
                <FadeInOut toggle={loading}>
                    <div style={styles.detailLoading}>
                        <Text
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}
                        >
                            Combining on-chain
                        </Text>
                        <Loader color="white" />
                    </div>
                </FadeInOut>
                {/* <FadeInOut toggle={!loading}>
                    <div style={styles.detailLoading}>
                        <Button
                            hoverStyle={{ filter: 'brightness(.9)' }}
                            buttonStyle={{
                                background: 'transparent',
                                padding: '0',
                            }}
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}
                            label="Zoom"
                            onClick={() =>
                                AppState.dispatch.setIsZoomOn({
                                    _localStorageValue: !isZoomOn,
                                    _localStorageTarget: 'zoom',
                                    _localStorageExpectedType: 'unique',
                                })
                            }
                            rightIcon={
                                isZoomOn ? (
                                    <IoCheckmarkCircle
                                        color="white"
                                        size={20}
                                    />
                                ) : (
                                    <IoEllipseOutline color="white" size={20} />
                                )
                            }
                        />
                    </div>
                </FadeInOut> */}
                <FadeInOut toggle={!loading}>
                    <div style={styles.detailLoading}>
                        <Button
                            hoverStyle={{ filter: 'brightness(.9)' }}
                            buttonStyle={{
                                background: 'transparent',
                                padding: '0',
                            }}
                            type="text"
                            textStyle={{
                                color: 'white',
                                marginRight: '.5rem',
                            }}
                            label="Refresh"
                            onClick={() => refresh()}
                            rightIcon={<IoSync color="white" size={20} />}
                        />
                    </div>
                </FadeInOut>
                <div
                    ref={scrollRef}
                    style={{
                        ...styles.detailSelectedItems,
                        marginRight: '30px',
                        width: '100%',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                    }}
                >
                    {liveSelectedItems.map((item, index) => (
                        <div
                            style={{
                                ...styles.detailSelectedItem,
                                minWidth: 120,
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            key={`item-${index}`}
                        >
                            <Button
                                buttonStyle={styles.detailSelectedItemClose}
                                rightIcon={<IoClose size={15} />}
                                onClick={() =>
                                    setSelectedItems((items) => {
                                        items.toggle(item, 'fileName');
                                        return items;
                                    })
                                }
                            />
                            <Button
                                buttonStyle={styles.detailSelectedVsCode}
                                type="text"
                                size="small"
                                leftIcon={
                                    <SiVisualstudiocode color={lib.colors.nuggBlueText} size={15} />
                                }
                                onClick={() => window.dotnugg.openToVSCode(item.fileUri)}
                            />
                            <img
                                src={item.svg}
                                style={{
                                    height: '55%',
                                }}
                                alt="fix"
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...styles.detailSelectedItemId,
                                    // top: '.4rem',
                                    // bottom: ' .3rem',
                                    // right: undefined,
                                }}
                            >
                                <Label
                                    type="text"
                                    size="small"
                                    textStyle={{
                                        color: lib.colors.transparentDarkGrey,
                                        // marginLeft: '.5rem',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                    }}
                                    text={`${'hannnd'} ${item.id}`}
                                />
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'end',
                                    textAlign: 'center',
                                }}
                            >
                                <Text
                                    textStyle={{
                                        fontSize: 14,
                                        textAlign: 'center',
                                        marginRight: '2px',
                                    }}
                                >
                                    {(item.percentWeight * 10000).toFixed(0)}
                                </Text>
                                <Text
                                    textStyle={{
                                        fontSize: 10,
                                        textAlign: 'center',
                                        marginBottom: 1,
                                    }}
                                >
                                    {' / 10k'}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
};

export default DetailView;
