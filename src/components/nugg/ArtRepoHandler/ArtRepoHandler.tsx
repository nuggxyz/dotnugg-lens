import React, { FunctionComponent } from 'react';
import {
    IoClose,
    IoEllipsisHorizontal,
    IoFolderOpenOutline,
    IoMenu,
    IoOpenOutline,
    IoReload,
    IoTrashBinOutline,
} from 'react-icons/io5';
import { SiVisualstudiocode } from 'react-icons/si';

import { isUndefinedOrNullOrStringEmpty, shortenPathName } from '../../../lib';
import Colors from '../../../lib/colors';
import constants from '../../../lib/constants';
import AppState from '../../../state/app';
import Web3Config from '../../../Web3Config';
import Button from '../../general/Buttons/Button/Button';
import Flyout from '../../general/Flyout/Flyout';
import InteractiveText from '../../general/Texts/InteractiveText/InteractiveText';
import Text from '../../general/Texts/Text/Text';

import styles from './ArtRepoHandler.styles';

type Props = {};

const ArtRepoHandler: FunctionComponent<Props> = () => {
    const artLocation = AppState.select.artLocation();
    const apiKey = AppState.select.apiKey();

    return !isUndefinedOrNullOrStringEmpty(artLocation) ? (
        <div style={styles.artLocationContainer}>
            <Flyout
                style={styles.flyoutContainer}
                button={
                    <Button
                        buttonStyle={styles.artLocationDelete}
                        rightIcon={
                            <IoEllipsisHorizontal
                                color={Colors.nuggBlueText}
                                size={15}
                            />
                        }
                        onClick={() => {}}
                    />
                }>
                <>
                    <Button
                        buttonStyle={styles.flyoutSelect}
                        type="text"
                        size="small"
                        textStyle={styles.flyoutSelectText}
                        leftIcon={
                            <IoOpenOutline
                                color={Colors.nuggBlueText}
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
                                color={Colors.nuggBlueText}
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
                                color={Colors.nuggBlueText}
                                size={20}
                                style={styles.flyoutSelectIcon}
                            />
                        }
                        label="Recompile"
                        onClick={() => {
                            AppState.dispatch.setMainProcessLoading(true);
                            window.dotnugg.createCompiler(
                                artLocation,
                                Web3Config.DOTNUGG_V1,
                                apiKey,
                            );
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
                                color={Colors.nuggBlueText}
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
                                color={Colors.nuggBlueText}
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
                textStyle={{ color: Colors.nuggBlueText }}
                action={() => window.dotnugg.openTo(artLocation)}>
                {shortenPathName(artLocation)}
            </InteractiveText>
        </div>
    ) : null;
};

export default ArtRepoHandler;
