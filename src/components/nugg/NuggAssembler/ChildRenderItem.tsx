import React, { FunctionComponent } from 'react';
import { IoAdd } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import lib from '@src/lib';
import Text from '@src/components/general/Texts/Text/Text';
import Button from '@src/components/general/Buttons/Button/Button';
import Loader from '@src/components/general/Loader/Loader';
import Label from '@src/components/general/Label/Label';
import client from '@src/client/index';
import { Item } from '@src/client/compiled';

import styles from './NuggAssembler.styles';

const ChildRenderItem: FunctionComponent<{
    item: Item;
    index: number;
}> = ({ item, index }) => {
    const liveItem = client.compiled.useCompiledItem(item.fileUri);
    const pushToRecents = client.recents.usePushToRecents();

    // const isSelected = useMemo(() => {
    //     return !isUndefinedOrNullOrObjectEmpty(
    //         extraData[0].find((listItem) => item.fileUri === listItem.fileUri),
    //     );
    // }, [extraData, item]);

    // const callback = React.useCallback(() => {
    //     extraData[1]((items) => {
    //         // item = { ...item, svg: item.svg };

    //         const ok = items.filter((x) => x.feature !== item.feature);

    //         ok.push(item);

    //         ok.sort((a, b) => a.feature - b.feature);

    //         // @ts-ignore - only recents have a time
    //         if (!item.time) pushToRecents({ fileUri: item.fileUri });

    //         return ok;
    //     });
    // }, [extraData]);

    return (
        <Button
            key={index}
            buttonStyle={{
                ...styles.detailChildrenderItem,
                background: styles.detailChildrenderItem.background,
                width: '150px',
                height: '150px',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            hoverStyle={{ filter: 'brightness(1)' }}
            leftIcon={
                <>
                    <Button
                        buttonStyle={styles.detailSelectedItemClose}
                        rightIcon={<IoAdd size={15} color={lib.colors.green} />}
                        onClick={() => pushToRecents(item.fileUri)}
                        // disabled={isSelected}
                    />
                    <Button
                        buttonStyle={styles.detailSelectedVsCode}
                        type="text"
                        size="small"
                        leftIcon={<SiVisualstudiocode color={lib.colors.nuggBlueText} size={15} />}
                        onClick={() => window.dotnugg.openToVSCode(item.fileUri)}
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
                            text={`${'hamd'} ${item.id}`}
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
                </>
            }
            onClick={() => undefined}
            rightIcon={
                liveItem?.svg || item.svg ? (
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
                            src={liveItem?.svg || item.svg}
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
                )
            }
        />
    );
};

export default ChildRenderItem;
