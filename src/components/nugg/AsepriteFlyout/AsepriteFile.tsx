import React, { FunctionComponent, useLayoutEffect, useState } from 'react';
import {
    IoCheckmark,
    IoChevronDown,
    IoChevronUp,
    IoCodeWorking,
    IoConstructOutline,
    IoSync,
} from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import { shortenPathName } from '../../../lib';
import Colors from '../../../lib/colors';
import constants from '../../../lib/constants';
import globalStyles from '../../../lib/globalStyles';
import Layout from '../../../lib/layout';
import AppState from '../../../state/app';
import Button from '../../general/Buttons/Button/Button';
import Loader from '../../general/Loader/Loader';
import Text from '../../general/Texts/Text/Text';
type Props = {
    title: NL.Redux.App.AsepriteFile;
    extraData: any[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
};

const AsepriteFile: FunctionComponent<Props> = ({
    title,
    extraData,
    setOpen,
    open,
}) => {
    useLayoutEffect(() => {
        setOpen(false);
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                padding: '1rem 0rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'white',
                borderBottom: `1px solid ${
                    open ? Colors.transparentLightGrey : 'white'
                }`,
            }}>
            <Text type="text">
                {shortenPathName(title.path).split('/').last()}
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
                        setOpen(!open);
                    }}
                    rightIcon={
                        open ? (
                            <IoChevronUp color={Colors.nuggBlueText} />
                        ) : (
                            <IoChevronDown color={Colors.nuggBlueText} />
                        )
                    }
                />
                <Button
                    buttonStyle={{
                        background: Colors.nuggBlueTransparent,
                        borderRadius: Layout.borderRadius.large,
                        padding: '.5rem',
                        marginLeft: '.5rem',
                    }}
                    onClick={() => {
                        const pathNames = title.path.split('.')[0].split('/');
                        window.dotnugg.openTo(
                            `${extraData[0]}/generated_${
                                pathNames[pathNames.length - 1]
                            }`,
                            constants.APP_NAME_VS_CODE,
                        );
                    }}
                    rightIcon={
                        <SiVisualstudiocode color={Colors.nuggBlueText} />
                    }
                />
                <Button
                    buttonStyle={{
                        background: Colors.nuggBlueTransparent,
                        borderRadius: Layout.borderRadius.large,
                        padding: '.5rem',
                        marginLeft: '.5rem',
                    }}
                    onClick={() => {
                        if (title.loading) {
                            AppState.dispatch.updateAsepriteFiles({
                                ...title,
                                loading: false,
                            });
                        } else {
                            AppState.dispatch.updateAsepriteFiles({
                                ...title,
                                loading: true,
                            });
                            window.dotnugg.convertAseprite(
                                title.path,
                                extraData[0],
                            );
                        }
                    }}
                    rightIcon={
                        title.loading ? (
                            <Loader />
                        ) : title.compiled ? (
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

export default AsepriteFile;
