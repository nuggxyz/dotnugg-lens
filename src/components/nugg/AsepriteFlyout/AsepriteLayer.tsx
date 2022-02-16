import React, { FunctionComponent, useState } from 'react';
import {
    IoCheckmark,
    IoChevronDown,
    IoChevronUp,
    IoCodeWorking,
    IoConstructOutline,
    IoSync,
} from 'react-icons/io5';

import { shortenPathName } from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';
import AppState from '../../../state/app';
import Button from '../../general/Buttons/Button/Button';
import Loader from '../../general/Loader/Loader';
import Text from '../../general/Texts/Text/Text';

type Props = {
    item: NL.Redux.App.AsepriteFile;
    extraData: any[];
    index: number;
};

const AsepriteLayer: FunctionComponent<Props> = ({
    item,
    index,
    extraData,
}) => {
    return (
        <div
            key={`layer-${index}`}
            style={{
                display: 'flex',
                padding: '1rem 2rem',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <Text type="text">
                {shortenPathName(item.path).split('/').last()}
            </Text>
            <div style={{ display: 'flex' }}>
                <Button
                    buttonStyle={{
                        background: Colors.nuggBlueTransparent,
                        borderRadius: Layout.borderRadius.large,
                        padding: '.5rem',
                        marginLeft: '.5rem',
                    }}
                    onClick={() => {
                        if (item.loading) {
                            AppState.dispatch.updateAsepriteLayer({
                                layer: {
                                    ...item,
                                    loading: false,
                                },
                                file: extraData[2][0].path,
                            });
                        } else {
                            AppState.dispatch.updateAsepriteLayer({
                                layer: {
                                    ...item,
                                    loading: true,
                                },
                                file: extraData[2][0].path,
                            });
                            window.dotnugg.convertAseprite(
                                extraData[2][0].path,
                                extraData[0],
                                item.path,
                            );
                        }
                    }}
                    rightIcon={
                        item.loading ? (
                            <Loader />
                        ) : item.compiled ? (
                            <IoCheckmark color={Colors.nuggBlueText} />
                        ) : (
                            <IoConstructOutline color={Colors.nuggBlueText} />
                        )
                    }
                />
            </div>
        </div>
    );
};

export default AsepriteLayer;
