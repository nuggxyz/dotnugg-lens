import React, { FunctionComponent } from 'react';
import {
    IoClose,
    IoEllipsisHorizontal,
    IoFolderOpenOutline,
    IoMenu,
    IoOpenOutline,
    IoReload,
} from 'react-icons/io5';

import { isUndefinedOrNullOrStringEmpty, shortenPathName } from '../../../lib';
import Colors from '../../../lib/colors';
import AppState from '../../../state/app';
import Button from '../../general/Buttons/Button/Button';
import Flyout from '../../general/Flyouts/Flyout/Flyout';
import InteractiveText from '../../general/Texts/InteractiveText/InteractiveText';
import Text from '../../general/Texts/Text/Text';

import styles from './ArtRepoHandler.styles';

type Props = {};

const ArtRepoHandler: FunctionComponent<Props> = () => {
    const artLocation = AppState.select.artLocation();

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
                            <IoFolderOpenOutline
                                color={Colors.nuggBlueText}
                                size={20}
                                style={styles.flyoutSelectIcon}
                            />
                        }
                        label="Change directories"
                        onClick={() => window.dotnugg.selectFiles()}
                    />
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
                            <IoReload
                                color={Colors.nuggBlueText}
                                size={20}
                                style={styles.flyoutSelectIcon}
                            />
                        }
                        label="Recompile"
                        onClick={() =>
                            window.dotnugg.createCompiler(artLocation)
                        }
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
