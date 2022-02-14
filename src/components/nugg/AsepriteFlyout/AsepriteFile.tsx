import React, { FunctionComponent } from 'react';
import {
    IoCheckmark,
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
    return (
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
                        window.dotnugg.convertAseprite(file.path, artLocation);
                    }
                }}
                rightIcon={
                    file.loading ? (
                        <Loader />
                    ) : file.compiled ? (
                        <IoCheckmark color={Colors.nuggBlueText} />
                    ) : (
                        <IoConstructOutline color={Colors.nuggBlueText} />
                    )
                }
            />
            {/* <IoSync /> */}
        </div>
    );
};

export default AsepriteFile;
