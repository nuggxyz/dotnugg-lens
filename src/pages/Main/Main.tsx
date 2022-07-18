import * as React from 'react';
import { IoPower } from 'react-icons/io5';

import { isUndefinedOrNullOrStringEmpty } from '@src/lib';
import Button from '@src/components/general/Buttons/Button/Button';
import Colors from '@src/lib/colors';
import ArtRepoHandler from '@src/components/nugg/ArtRepoHandler/ArtRepoHandler';
import NuggAssembler from '@src/components/nugg/NuggAssembler/NuggAssembler';
import UseOurs from '@src/components/nugg/UseOurs';
import client from '@src/client';

import styles from './Main.styles';

const Main = () => {
    const updateInfuraKey = client.compiled.useUpdateInfuraKey();
    const artLocation = client.compiled.useArtDir();
    // const loading = client.compiled.useLoading();

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    height: 100,
                    top: 0,
                    width: '100%',
                    // @ts-ignore
                    WebkitAppRegion: 'drag',
                }}
            />
            {/* <FadeInOut toggle={loading} style={styles.loaderContainer}>
                <Text
                    textStyle={{
                        color: Colors.nuggBlueText,
                        marginRight: '.5rem',
                    }}
                >
                    Computing
                </Text>
                <Loader color={Colors.nuggBlueText} />
            </FadeInOut> */}
            <div
                // toggle={!loading}
                style={{
                    position: 'absolute',
                    top: '2.5rem',
                    left: '8rem',
                }}
            >
                <ArtRepoHandler />
            </div>
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
            {!isUndefinedOrNullOrStringEmpty(artLocation) ? <NuggAssembler /> : null}
        </>
    );
};

export default Main;
