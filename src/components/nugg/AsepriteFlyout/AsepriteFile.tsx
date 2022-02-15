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
    file: NL.Redux.App.AsepriteFile;
    index: number;
    artLocation: string;
};

const AsepriteFile: FunctionComponent<Props> = ({
    file,
    index,
    artLocation,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div
                key={`aseprite-${index}`}
                style={{
                    display: 'flex',
                    padding: '1rem 0rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Text type="text">
                    {shortenPathName(file.path).split('/').last()}
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
                            if (file.loading) {
                                AppState.dispatch.updateAsepriteFiles({
                                    ...file,
                                    loading: false,
                                });
                            } else {
                                AppState.dispatch.updateAsepriteFiles({
                                    ...file,
                                    loading: true,
                                });
                                window.dotnugg.convertAseprite(
                                    file.path,
                                    artLocation,
                                );
                            }
                        }}
                        rightIcon={
                            file.loading ? (
                                <Loader />
                            ) : file.compiled ? (
                                <IoCheckmark color={Colors.nuggBlueText} />
                            ) : (
                                <IoConstructOutline
                                    color={Colors.nuggBlueText}
                                />
                            )
                        }
                    />
                </div>
            </div>
            {open && (
                <div>
                    {file.layers?.map((layer) => (
                        <div>{layer.path}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AsepriteFile;
