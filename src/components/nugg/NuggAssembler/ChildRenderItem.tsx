import React, { FunctionComponent, useMemo } from 'react';
import { IoDocument } from 'react-icons/io5';

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
            extraData[0].find(
                (listItem) => item.fileName === listItem.fileName,
            ),
        );
    }, [extraData, item]);

    return (
        <Button
            key={index}
            buttonStyle={{
                background: isSelected
                    ? Colors.nuggBlueTransparent
                    : 'transparent',
                ...styles.detailChildrenderItem,
                width: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            leftIcon={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        ...styles.detailSelectedItemId,
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
                        }}
                        text={
                            constants.DOTNUGG_ITEMS[item.feature] +
                            ' ' +
                            item.id
                        }></Label>
                </div>
            }
            onClick={() => {
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
            }}
            rightIcon={
                liveItem?.svg || item.svg ? (
                    <img
                        src={liveItem?.svg || item.svg}
                        style={{
                            // height: '150px',
                            width: '90%',
                        }}
                    />
                ) : (
                    <div
                        style={{
                            height: '150px',
                            width: '150px',
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
