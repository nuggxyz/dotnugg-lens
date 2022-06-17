import React, { FunctionComponent } from 'react';
import { IoFolderOpenOutline, IoOpenOutline, IoReload, IoTrashBinOutline } from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import lib from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import client from '@src/client/index';
import { useDotnuggV1 } from '@src/contracts/useContract';

import styles from './ArtRepoHandler.styles';

const ArtRepoHandler: FunctionComponent<unknown> = () => {
    const artLocation = client.compiled.useArtDir();
    const apiKey = client.compiled.useInfuraKey();
    const updateMainIsLoading = client.compiled.useSetMainLoading();

    const dotnugg = useDotnuggV1();

    return artLocation ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '.5rem',
                background: lib.colors.transparentWhite,
                borderRadius: lib.layout.borderRadius.large,
            }}
        >
            <Button
                className="mobile-pressable-div"
                buttonStyle={{ ...styles.flyoutSelect, background: 'transparent', padding: 10 }}
                type="text"
                size="small"
                textStyle={styles.flyoutSelectText}
                leftIcon={
                    <IoOpenOutline
                        color={lib.colors.nuggBlueText}
                        size={20}
                        style={styles.flyoutSelectIcon}
                    />
                }
                label="Open in Finder"
                onClick={() => window.dotnugg.openTo(artLocation)}
            />
            <Button
                className="mobile-pressable-div"
                buttonStyle={{ ...styles.flyoutSelect, background: 'transparent', padding: 10 }}
                type="text"
                size="small"
                textStyle={styles.flyoutSelectText}
                leftIcon={
                    <SiVisualstudiocode
                        color={lib.colors.nuggBlueText}
                        size={20}
                        style={styles.flyoutSelectIcon}
                    />
                }
                label="Open in VS Code"
                onClick={() => window.dotnugg.openToVSCode(artLocation)}
            />
            <div style={styles.divider} />
            <Button
                className="mobile-pressable-div"
                buttonStyle={{ ...styles.flyoutSelect, background: 'transparent', padding: 10 }}
                type="text"
                size="small"
                textStyle={styles.flyoutSelectText}
                leftIcon={
                    <IoReload
                        color={lib.colors.nuggBlueText}
                        size={20}
                        style={styles.flyoutSelectIcon}
                    />
                }
                label="Recompile"
                onClick={() => {
                    updateMainIsLoading(true);
                    window.dotnugg.createCompiler(artLocation, dotnugg.address, apiKey);
                }}
            />
            <div style={styles.divider} />
            <Button
                className="mobile-pressable-div"
                buttonStyle={{ ...styles.flyoutSelect, background: 'transparent', padding: 10 }}
                type="text"
                size="small"
                textStyle={styles.flyoutSelectText}
                leftIcon={
                    <IoTrashBinOutline
                        color={lib.colors.nuggBlueText}
                        size={20}
                        style={styles.flyoutSelectIcon}
                    />
                }
                label="Clear cache"
                onClick={() => {
                    window.dotnugg.clearCache(artLocation);
                    client.compiled.useStore.persist.clearStorage();
                }}
            />
            <Button
                className="mobile-pressable-div"
                buttonStyle={{ ...styles.flyoutSelect, background: 'transparent', padding: 10 }}
                type="text"
                size="small"
                textStyle={styles.flyoutSelectText}
                leftIcon={
                    <IoFolderOpenOutline
                        color={lib.colors.nuggBlueText}
                        size={20}
                        style={styles.flyoutSelectIcon}
                    />
                }
                label="Change directories"
                onClick={() => window.dotnugg.selectFiles()}
            />
        </div>
    ) : null;
};

export default ArtRepoHandler;
