import React, { FunctionComponent } from 'react';
import { SiVisualstudiocode } from 'react-icons/si';

import lib from '@src/lib';
import Text from '@src/components/general/Texts/Text/Text';
import Button from '@src/components/general/Buttons/Button/Button';
import Loader from '@src/components/general/Loader/Loader';
import Label from '@src/components/general/Label/Label';
import client from '@src/client/index';

import styles from './NuggAssembler.styles';

const ChildRenderItem: FunctionComponent<{
    fileUri: string;
    index: number;
}> = ({ fileUri, index }) => {
    const item = client.compiled.useCompiledItem(fileUri);
    const pushToRecents = client.recents.usePushToRecents();
    const select = client.compiled.useSelect();
    const featureNames = client.compiled.useFeautureNames();

    const svg = client.compiled.useItemSvg(fileUri);

    if (!item) return null;
    return (
        <div
            className="mobile-pressable-div"
            key={index}
            role="button"
            aria-hidden="true"
            style={{
                ...styles.detailChildrenderItem,
                background: styles.detailChildrenderItem.background,
                width: '150px',
                height: '150px',
                margin: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: lib.layout.boxShadow.basic,
            }}
            onClick={() => {
                pushToRecents(item.fileUri);
                select(item.fileUri);
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

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    ...styles.detailSelectedItemId,
                    paddingBottom: 5,
                }}
            >
                {/* <IoDocument size={25} color={lib.colors.transparentDarkGrey} /> */}
                <Label
                    type="text"
                    size="small"
                    textStyle={{
                        color: lib.colors.transparentDarkGrey,
                        // marginLeft: '.5rem',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        // paddingBottom: 5,
                        position: 'relative',
                    }}
                    text={`${featureNames[item.feature]?.toLowerCase() ?? 'unknown'} ${item.id}`}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        ...styles.detailSelectedItemId,
                        // right: undefined,
                        left: styles.detailSelectedItemId.right,
                    }}
                >
                    {/* <IoDocument size={25} color={lib.colors.transparentDarkGrey} /> */}
                    {/* <Label
                            type="text"
                            size="small"
                            textStyle={{
                                color: lib.colors.transparentDarkGrey,
                                // marginLeft: '.5rem',
                                fontSize: '10px',
                                fontWeight: 'bold',
                            }}
                            text={(item.percentWeight * 100000).toFixed(
                                0,
                            )}></Label> */}
                </div>
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
            {svg?.svg ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={svg.svg}
                        className="customized-dotnugg"
                        style={{
                            // alignSelf: 'center',
                            // height: '150px',
                            height: '50%',
                        }}
                        alt="fix"
                    />
                </div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Loader color="white" />
                </div>
            )}
        </div>
    );
};

export default ChildRenderItem;
