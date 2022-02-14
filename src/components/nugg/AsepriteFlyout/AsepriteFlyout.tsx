import React, { FunctionComponent } from 'react';
import { IoSync } from 'react-icons/io5';

import { isUndefinedOrNullOrArrayEmpty, shortenPathName } from '../../../lib';
import Colors from '../../../lib/colors';
import Text from '../../general/Texts/Text/Text';

import AsepriteFile from './AsepriteFile';

type Props = {
    asepriteFiles: NL.Redux.App.AsepriteFile[];
    artLocation: string;
};

const AsepriteFlyout: FunctionComponent<Props> = ({
    asepriteFiles,
    artLocation,
}) => {
    return !isUndefinedOrNullOrArrayEmpty(asepriteFiles) ? (
        <>
            {asepriteFiles.map((file, index) => (
                <React.Fragment key={`file-${index}`}>
                    <AsepriteFile {...{ file, index, artLocation }} />
                </React.Fragment>
            ))}
        </>
    ) : (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
            <Text
                type="text"
                textStyle={{
                    color: Colors.nuggBlueText,
                    textAlign: 'center',
                }}>
                Drag in some aseprite files to convert to dotnugg
            </Text>
        </div>
    );
};

export default AsepriteFlyout;
