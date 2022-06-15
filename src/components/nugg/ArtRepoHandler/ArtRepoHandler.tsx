import React, { FunctionComponent } from 'react';
import {
    IoEllipsisHorizontal,
    IoFolderOpenOutline,
    IoOpenOutline,
    IoReload,
    IoTrashBinOutline,
} from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import lib, { isUndefinedOrNullOrStringEmpty, shortenPathName } from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import Flyout from '@src/components/general/Flyout/Flyout';
import InteractiveText from '@src/components/general/Texts/InteractiveText/InteractiveText';
import client from '@src/client/index';
import { useDotnuggV1 } from '@src/contracts/useContract';

import styles from './ArtRepoHandler.styles';

const ArtRepoHandler: FunctionComponent<unknown> = () => {
    const artLocation = client.keys.useArtDir();
    const apiKey = client.keys.useInfuraKey();
    const updateMainIsLoading = client.keys.useUpdateMainIsLoading();

    const dotnugg = useDotnuggV1();

    return !isUndefinedOrNullOrStringEmpty(artLocation) ? (
        <div style={styles.artLocationContainer}>
            <Flyout
                style={styles.flyoutContainer}
                button={
                    <Button
                        buttonStyle={styles.artLocationDelete}
                        rightIcon={
                            <IoEllipsisHorizontal color={lib.colors.nuggBlueText} size={15} />
                        }
                        onClick={() => {}}
                    />
                }
            >
                <>
                    <Button
                        buttonStyle={styles.flyoutSelect}
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
                        label="Open"
                        onClick={() => window.dotnugg.openTo(artLocation)}
                    />
                    <Button
                        buttonStyle={styles.flyoutSelect}
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
                        buttonStyle={styles.flyoutSelect}
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
                        buttonStyle={styles.flyoutSelect}
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
                        }}
                    />
                    <Button
                        buttonStyle={styles.flyoutSelect}
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
                </>
            </Flyout>
            <InteractiveText
                weight="bold"
                type="text"
                textStyle={{ color: lib.colors.nuggBlueText }}
                action={() => window.dotnugg.openTo(artLocation)}
            >
                {shortenPathName(artLocation)}
            </InteractiveText>
        </div>
    ) : null;
};

export default ArtRepoHandler;
