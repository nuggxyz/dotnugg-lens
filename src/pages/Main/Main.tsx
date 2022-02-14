import * as React from 'react';
import { IoFileTrayOutline, IoPower } from 'react-icons/io5';

import AppState from '../../state/app';
import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
    shortenPathName,
} from '../../lib';
import Button from '../../components/general/Buttons/Button/Button';
import constants from '../../lib/constants';
import Text from '../../components/general/Texts/Text/Text';
import Colors from '../../lib/colors';
import Dropzone from '../../components/nugg/Dropzone/Dropzone';
import ArtRepoHandler from '../../components/nugg/ArtRepoHandler/ArtRepoHandler';
import NuggAssembler from '../../components/nugg/NuggAssembler/NuggAssembler';
import Flyout from '../../components/general/Flyouts/Flyout/Flyout';
import AsepriteFlyout from '../../components/nugg/AsepriteFlyout/AsepriteFlyout';

import styles from './Main.styles';

const Main = () => {
    const compiledItems = AppState.select.compiledItems();
    const formattedCompiledItems = React.useMemo(() => {
        return Object.entries(compiledItems).map(([key, value]) => {
            return {
                title: constants.DOTNUGG_ITEMS[key],
                items: Object.values(value),
            };
        });
    }, [compiledItems]);
    const artLocation = AppState.select.artLocation();
    const asepriteFiles = AppState.select.asepriteFiles();

    const [svg, setSvg] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    return (
        <Dropzone
            onDrop={(files) =>
                AppState.dispatch.addToAsepriteFiles(
                    files.map((file) => {
                        return { path: file, compiled: false, loading: false };
                    }),
                )
            }>
            <ArtRepoHandler />
            <Button
                buttonStyle={{ ...styles.powerButton, ...styles.buttonRound }}
                rightIcon={<IoPower color={Colors.nuggBlueText} size={25} />}
                onClick={() =>
                    AppState.dispatch.setApiKey({
                        _localStorageTarget: 'apiKey',
                        _localStorageExpectedType: 'unique',
                        _localStorageValue: '',
                    })
                }
            />
            <Flyout
                containerStyle={styles.trayButton}
                style={{
                    top: '2.9rem',
                    right: '-.5rem',
                    minWidth: '200px',
                    height: '400px',
                    padding: '0rem 1rem',
                    overflow: 'scroll',
                }}
                button={
                    <>
                        <Button
                            buttonStyle={styles.buttonRound}
                            rightIcon={
                                <IoFileTrayOutline
                                    color={Colors.nuggBlueText}
                                    size={25}
                                />
                            }
                            onClick={() => {}}
                        />
                        {!isUndefinedOrNullOrArrayEmpty(asepriteFiles) &&
                            asepriteFiles.filter((file) => !file.compiled)
                                .length > 0 && (
                                <Text
                                    textStyle={styles.badge}
                                    type="text"
                                    size="smaller">
                                    {
                                        asepriteFiles.filter(
                                            (file) => !file.compiled,
                                        ).length
                                    }
                                </Text>
                            )}
                    </>
                }>
                <AsepriteFlyout
                    asepriteFiles={asepriteFiles}
                    artLocation={artLocation}
                />
            </Flyout>

            {isUndefinedOrNullOrStringEmpty(artLocation) && (
                <Button
                    textStyle={styles.artLocationPicker}
                    buttonStyle={styles.buttonLong}
                    label="Select Art Directory"
                    onClick={() => window.dotnugg.selectFiles()}
                />
            )}
            <NuggAssembler data={formattedCompiledItems} />
        </Dropzone>
    );
};

export default Main;