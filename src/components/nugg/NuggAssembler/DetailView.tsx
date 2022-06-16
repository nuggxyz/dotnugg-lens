import React, { FunctionComponent, useRef } from 'react';
import { IoSync } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import lib, { isUndefinedOrNullOrStringEmpty } from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import FadeInOut from '@src/components/general/FadeInOut/FadeInOut';
import Loader from '@src/components/general/Loader/Loader';
import Text from '@src/components/general/Texts/Text/Text';
import Label from '@src/components/general/Label/Label';
import client from '@src/client';

import styles from './NuggAssembler.styles';

const DetailView: FunctionComponent<unknown> = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const liveSelectedItems = client.compiled.useSelectedFileUris();
    const svg = client.compiled.useSvg();
    const loading = client.compiled.useLoading();
    const combo = client.compiled.useCombo();

    return (
        <div style={styles.detailContainer}>
            <div
                style={{
                    zIndex: 2,
                    width: '100%',
                    height: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    overflow: 'visible',
                }}
            >
                {!isUndefinedOrNullOrStringEmpty(svg) && (
                    <img
                        src={svg}
                        style={{
                            width: '100%',
                            height: '100%',
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
                            onClick={() => {
                                void combo();
                            }}
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
                    {liveSelectedItems.map((item, i) => (
                        <SelectedItem key={`selected-${item ?? i}`} fileUri={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailView;

const SelectedItem = ({ fileUri }: { fileUri?: string | null }) => {
    const item = client.compiled.useCompiledItem(fileUri);
    const deselect = client.compiled.useDeselect();
    const featureNames = client.compiled.useFeautureNames();

    return item ? (
        <div
            role="button"
            aria-hidden="true"
            className="mobile-pressable-div"
            style={{
                ...styles.detailSelectedItem,
                minWidth: 120,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
            }}
            key={`item-${item.fileUri}`}
            onClick={() => {
                deselect(item.fileUri);
            }}
        >
            <Button
                buttonStyle={styles.detailSelectedVsCode}
                type="text"
                size="small"
                leftIcon={<SiVisualstudiocode color={lib.colors.nuggBlueText} size={15} />}
                onClick={(event) => {
                    event.stopPropagation();
                    window.dotnugg.openToVSCode(item.fileUri);
                }}
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
                    text={`${featureNames[item.feature]?.toLowerCase() ?? 'unknown'} ${item.id}`}
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
    ) : null;
};
