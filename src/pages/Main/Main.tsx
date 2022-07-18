import * as React from 'react';

import Button from '@src/components/general/Buttons/Button/Button';
import ArtRepoHandler from '@src/components/nugg/ArtRepoHandler/ArtRepoHandler';
import NuggAssembler from '@src/components/nugg/NuggAssembler/NuggAssembler';
import UseOurs from '@src/components/nugg/UseOurs';
import client from '@src/client';

import styles from './Main.styles';

const Main = () => {
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
            {/* <Button
                buttonStyle={{ ...styles.powerButton, ...styles.buttonRound }}
                rightIcon={<IoPower color={Colors.nuggBlueText} size={25} />}
                onClick={() => updateInfuraKey('')}
            /> */}
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
                </Flyout>
            ) : null} */}

            {!artLocation ? (
                <div>
                    <Button
                        textStyle={styles.artLocationPicker}
                        buttonStyle={styles.buttonLong}
                        label="Select Art Directory"
                        onClick={() => window.dotnugg.selectFiles()}
                    />
                    <UseOurs />
                </div>
            ) : (
                <NuggAssembler />
            )}
        </>
    );
};

export default Main;
