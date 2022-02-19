import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { IoSync } from 'react-icons/io5';

import {
    isUndefinedOrNullOrArrayEmpty,
    saveToLocalStorage,
    shortenPathName,
} from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';
import StickyList from '../../general/List/StickyList';
import Text from '../../general/Texts/Text/Text';

import AsepriteFile from './AsepriteFile';
import AsepriteLayer from './AsepriteLayer';

type Props = {
    asepriteFiles: NL.Redux.App.AsepriteFile[];
    artLocation: string;
};

const AsepriteFlyout: FunctionComponent<Props> = ({
    asepriteFiles,
    artLocation,
}) => {
    const formattedData = useMemo(() => {
        return !isUndefinedOrNullOrArrayEmpty(asepriteFiles)
            ? asepriteFiles.map((file) => {
                  return {
                      title: {
                          path: file.path,
                          compiled: file.compiled,
                          loading: file.loading,
                      },
                      items: file.layers,
                  };
              })
            : [];
    }, [asepriteFiles]);

    useEffect(() => {
        console.log(asepriteFiles);
        saveToLocalStorage(asepriteFiles, 'asepriteFiles');
    }, [asepriteFiles]);

    return !isUndefinedOrNullOrArrayEmpty(formattedData) ? (
        <StickyList
            style={{ height: '100%' }}
            styleRight={{ width: '100%', height: '100%' }}
            data={formattedData}
            extraData={[artLocation]}
            TitleRenderItem={AsepriteFile}
            ChildRenderItem={AsepriteLayer}
        />
    ) : (
        // <>
        //     {asepriteFiles.map((file, index) => (
        //         <React.Fragment key={`file-${index}`}>
        //             <AsepriteFile {...{ file, index, artLocation }} />
        //         </React.Fragment>
        //     ))}
        // </>
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
