import * as React from 'react';
import { IoPower } from 'react-icons/io5';

import { isUndefinedOrNullOrStringEmpty } from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import Text from '@src/components/general/Texts/Text/Text';
import Colors from '@src/lib/colors';
import Dropzone from '@src/components/nugg/Dropzone/Dropzone';
import ArtRepoHandler from '@src/components/nugg/ArtRepoHandler/ArtRepoHandler';
import NuggAssembler from '@src/components/nugg/NuggAssembler/NuggAssembler';
import FadeInOut from '@src/components/general/FadeInOut/FadeInOut';
import Loader from '@src/components/general/Loader/Loader';
import UseOurs from '@src/components/nugg/UseOurs';
import client from '@src/client';

import styles from './Main.styles';

const Main = () => {
    const compiledItems = client.compiled.useAllCompiledItems();
    const recents = client.recents.useRecents();
    const updateInfuraKey = client.keys.useUpdateInfuraKey();
    const artLocation = client.keys.useArtDir();
    // const asepriteFiles = AppState.select.asepriteFiles();
    const loading = client.keys.useMainIsLoading();

    const recentAndCompiled = React.useMemo(() => {
        const items: (typeof compiledItems[number]['items'][number] & {
            time: number;
        })[] = [];
        compiledItems.forEach((x) => {
            x.items.forEach((y) => {
                const t = recents.find((z) => z.fileUri === y.fileUri);
                if (t) items.push({ ...y, time: t.time });
            });
        });
        return [
            {
                title: 'RECENT',
                items: items.sort((a, b) => (a.time > b.time ? -1 : 1)),
            },
            ...compiledItems,
        ];
    }, [recents, compiledItems]);

    console.log({ artLocation });

    return (
        <Dropzone
            onDrop={() => {
                // if (!isUndefinedOrNullOrStringEmpty(artLocation)) {
                //     // files.forEach((file) => window.dotnugg.listLayers(file));
                //     AppState.dispatch.addToAsepriteFiles(
                //         files.map((file) => {
                //             window.dotnugg.listLayers(file);
                //             return {
                //                 path: file,
                //                 compiled: false,
                //                 loading: false,
                //             };
                //         }),
                //     );
                // }
            }}
        >
            <FadeInOut toggle={loading} style={styles.loaderContainer}>
                <Text
                    textStyle={{
                        color: Colors.nuggBlueText,
                        marginRight: '.5rem',
                    }}
                >
                    Computing
                </Text>
                <Loader color={Colors.nuggBlueText} />
            </FadeInOut>
            <FadeInOut
                toggle={!loading}
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                }}
            >
                <ArtRepoHandler />
            </FadeInOut>
            <Button
                buttonStyle={{ ...styles.powerButton, ...styles.buttonRound }}
                rightIcon={<IoPower color={Colors.nuggBlueText} size={25} />}
                onClick={() => updateInfuraKey('')}
            />
            {/* {artLocation ? (
                <Flyout
                    containerStyle={styles.trayButton}
                    style={{
                        top: '2.9rem',
                        right: '-.5rem',
                        minWidth: '400px',
                        height: '500px',
                        padding: '0rem 1rem',
                        overflow: 'scroll',
                    }}
                    button={
                        <>
                            <Button
                                buttonStyle={styles.buttonRound}
                                rightIcon={
                                    <IoFileTrayOutline color={Colors.nuggBlueText} size={25} />
                                }
                                onClick={() => {}}
                            />
                            {!isUndefinedOrNullOrArrayEmpty(asepriteFiles) &&
                                asepriteFiles.filter((file) => !file.compiled).length > 0 && (
                                    <Text textStyle={styles.badge} type="text" size="smaller">
                                        {asepriteFiles.filter((file) => !file.compiled).length}
                                    </Text>
                                )}
                        </>
                    }
                >
                    <AsepriteFlyout asepriteFiles={asepriteFiles} artLocation={artLocation} />
                </Flyout>
            ) : null} */}

            {isUndefinedOrNullOrStringEmpty(artLocation) ? (
                <div>
                    <Button
                        textStyle={styles.artLocationPicker}
                        buttonStyle={styles.buttonLong}
                        label="Select Art Directory"
                        onClick={() => window.dotnugg.selectFiles()}
                    />
                    <UseOurs />
                </div>
            ) : null}
            {!isUndefinedOrNullOrStringEmpty(artLocation) ? (
                <NuggAssembler data={recentAndCompiled} />
            ) : null}
        </Dropzone>
    );
};

export default Main;
