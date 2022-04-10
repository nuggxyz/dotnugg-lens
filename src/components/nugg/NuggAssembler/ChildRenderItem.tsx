import React, { FunctionComponent, useMemo } from 'react';
import {
    IoAdd,
    IoAddCircle,
    IoAddOutline,
    IoAttach,
    IoClose,
    IoDocument,
} from 'react-icons/io5';
import { SiAddthis, SiVisualstudiocode } from 'react-icons/si';

import { DotnuggV1Helper } from '../../../contracts/DotnuggHelper';
import { getFileFromPath, isUndefinedOrNullOrObjectEmpty } from '../../../lib';
import Text from '../../general/Texts/Text/Text';
import Colors from '../../../lib/colors';
import Button from '../../general/Buttons/Button/Button';
import Loader from '../../general/Loader/Loader';
import { Item } from '../../../state/ipcListeners';
import AppState from '../../../state/app';
import constants from '../../../lib/constants';
import Label from '../../general/Label/Label';

import styles from './NuggAssembler.styles';

type Props = {
    item: Item['items'][number];
    extraData: any[];
    index: number;
};

const ChildRenderItem: FunctionComponent<Props> = ({
    item,
    extraData,
    index,
}) => {
    const liveItem = AppState.hook.useCompiledItem(item.fileUri);

    const isSelected = useMemo(() => {
        return !isUndefinedOrNullOrObjectEmpty(
            extraData[0].find((listItem) => item.fileUri === listItem.fileUri),
        );
    }, [extraData, item]);

    const callback = React.useCallback(() => {
        extraData[1]((items) => {
            // item = { ...item, svg: item.svg };

            const ok = items.filter((x) => x.feature !== item.feature);

            ok.push(item);

            ok.sort((a, b) => a.feature - b.feature);

            // @ts-ignore - only recents have a time
            if (!item.time)
                AppState.dispatch.addRecent({ fileUri: item.fileUri });

            return ok;
        });
    }, [extraData]);

    return (
        <Button
            key={index}
            buttonStyle={{
                ...styles.detailChildrenderItem,
                background: isSelected
                    ? Colors.nuggBlueSemiTransparent
                    : styles.detailChildrenderItem.background,
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
                        rightIcon={<IoAdd size={15} color={Colors.green} />}
                        onClick={callback}
                        disabled={isSelected}
                    />
                    <Button
                        buttonStyle={styles.detailSelectedVsCode}
                        type="text"
                        size="small"
                        leftIcon={
                            <SiVisualstudiocode
                                color={Colors.nuggBlueText}
                                size={15}
                            />
                        }
                        onClick={() =>
                            window.dotnugg.openToVSCode(item.fileUri)
                        }
                    />

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            ...styles.detailSelectedItemId,
                            paddingBottom: 5,
                        }}>
                        {/* <IoDocument size={25} color={Colors.transparentDarkGrey} /> */}
                        <Label
                            type="text"
                            size="small"
                            textStyle={{
                                color: Colors.transparentDarkGrey,
                                // marginLeft: '.5rem',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                // paddingBottom: 5,
                                position: 'relative',
                            }}
                            text={
                                constants.DOTNUGG_ITEMS[item.feature] +
                                ' ' +
                                item.id
                            }></Label>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                ...styles.detailSelectedItemId,
                                // right: undefined,
                                left: styles.detailSelectedItemId.right,
                            }}>
                            {/* <IoDocument size={25} color={Colors.transparentDarkGrey} /> */}
                            {/* <Label
                            type="text"
                            size="small"
                            textStyle={{
                                color: Colors.transparentDarkGrey,
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
                        }}>
                        <Text
                            textStyle={{
                                fontSize: 14,
                                textAlign: 'center',
                                marginRight: '2px',
                            }}>
                            {(item.percentWeight * 10000).toFixed(0)}
                        </Text>
                        <Text
                            textStyle={{
                                fontSize: 10,
                                textAlign: 'center',
                                marginBottom: 1,
                            }}>
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
                        }}>
                        <img
                            src={liveItem?.svg || item.svg}
                            style={{
                                // alignSelf: 'center',
                                // height: '150px',
                                height: '50%',
                            }}
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
                        }}>
                        <Loader color="white" />
                    </div>
                )
            }
        />
    );
};

export default ChildRenderItem;
