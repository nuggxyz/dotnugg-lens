import React from 'react';
import { IoScan } from 'react-icons/io5';
import { HiDocumentAdd } from 'react-icons/hi';

import lib from '@src/lib';
import Dropzone from '@src/components/nugg/Dropzone/Dropzone';
import useOnHover from '@src/hooks/useOnHover';
import Text from '@src/components/general/Texts/Text/Text';
import client from '@src/client/index';
import Button from '@src/components/general/Buttons/Button/Button';

const Drop = () => {
    const [hoverRef, hovering] = useOnHover();
    return (
        <div
            style={{
                // width: '100%',
                // height: '100%',
                // width: 500,
                // height: 500,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                padding: 20,
                // ...(showNotice && globalStyles.hidden),
                // position: 'absolute',
                // transition: `all .3s ${lib.layout.animation}`,
            }}
        >
            <div
                // className="mobile-pressable-div"
                ref={hoverRef}
                style={{
                    height: 500,
                    width: 500,
                    background: lib.colors.primaryColor,
                    borderRadius: lib.layout.borderRadius.large,

                    opacity: hovering ? 0.75 : 1,
                }}
            >
                <Dropzone
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    onDrop={(files) => {
                        if (files.length !== 1) {
                            throw new Error('Only one file can be dropped');
                        }

                        window.dotnugg.listLayers(files[0]);
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        {!hovering ? (
                            <IoScan
                                style={{
                                    width: 100,
                                    height: 100,
                                    color: lib.colors.transparentWhite,
                                }}
                            />
                        ) : (
                            <HiDocumentAdd
                                style={{
                                    width: 100,
                                    height: 100,
                                    color: lib.colors.transparentWhite,
                                }}
                            />
                        )}
                        <Text
                            textStyle={{
                                fontSize: 20,
                                marginTop: 10,
                                fontFamily: lib.layout.fontFamily.rounded,
                                color: lib.colors.transparentWhite,
                            }}
                        >
                            drop a
                            <code
                                style={{
                                    fontFamily: lib.layout.fontFamily.monospace,
                                    fontSize: 22,
                                    padding: 5,
                                    color: 'white',
                                    fontWeight: lib.layout.fontWeight.thicc,
                                }}
                            >
                                .aseprite
                            </code>
                        </Text>
                    </div>
                </Dropzone>
            </div>
        </div>
    );
};

const Confirm = () => {
    const layers = client.aseprite.useLayers();
    const path = client.aseprite.usePath();
    const convert = client.aseprite.useConvert();
    const clear = client.aseprite.useOnClear();
    const success = client.aseprite.useSuccess();

    const artDir = client.compiled.useArtDir();

    return path ? (
        <div
            style={{
                width: '100%',
                // height: '100%',
                // width: 500,
                height: 500,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                padding: 20,
                // ...(showNotice && globalStyles.hidden),
                // position: 'absolute',
                // transition: `all .3s ${lib.layout.animation}`,
            }}
        >
            <div
                // className="mobile-pressable-div"
                // ref={hoverRef}
                style={{
                    // height: '75%',
                    // width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    // background: lib.colors.primaryColor,
                    borderRadius: lib.layout.borderRadius.large,
                }}
            >
                <Text size="large" textStyle={{ marginTop: 10 }}>
                    file
                </Text>
                <Text
                    size="medium"
                    textStyle={{
                        fontWeight: lib.layout.fontWeight.thicc,
                        fontFamily: lib.layout.fontFamily.monospace,
                        color: lib.colors.primaryColor,
                        overflowWrap: 'break-word',
                        width: '100%',
                        textAlign: 'left',
                    }}
                >
                    {path}
                </Text>
                <Text size="large" textStyle={{ marginTop: 10 }}>
                    destination
                </Text>
                <Text
                    size="medium"
                    textStyle={{
                        fontWeight: lib.layout.fontWeight.thicc,
                        fontFamily: lib.layout.fontFamily.monospace,
                        color: lib.colors.primaryColor,
                        overflowWrap: 'break-word',
                        width: '100%',
                        textAlign: 'left',
                    }}
                >
                    {artDir.split('/')[artDir.split('/').length - 1]}/.generated/
                </Text>
                <Text size="large" textStyle={{ marginTop: 10 }}>
                    layers
                </Text>
                <Text
                    size="larger"
                    textStyle={{
                        fontWeight: lib.layout.fontWeight.thicc,
                        fontFamily: lib.layout.fontFamily.monospace,
                        color: lib.colors.primaryColor,
                    }}
                >
                    {layers.length}
                </Text>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {!success ? (
                        <Button
                            onClick={() => {
                                convert(artDir);
                            }}
                            buttonStyle={{
                                borderRadius: lib.layout.borderRadius.large,
                                background: lib.colors.primaryColor,
                                marginTop: '20px',
                                boxShadow: lib.layout.boxShadow.basic,
                            }}
                            textStyle={{
                                color: lib.colors.white,
                                fontSize: 25,
                            }}
                            label={`convert ${layers.length} layers to .nugg`}
                        />
                    ) : (
                        <Button
                            onClick={() => {
                                window.dotnugg.openToVSCode(
                                    `${artDir}/.generated/${
                                        path.split('/')[path.split('/').length - 1]
                                    }/instructions.txt`,
                                );
                            }}
                            buttonStyle={{
                                borderRadius: lib.layout.borderRadius.large,
                                background: lib.colors.green,
                                marginTop: '20px',
                                boxShadow: lib.layout.boxShadow.basic,
                            }}
                            textStyle={{
                                color: lib.colors.white,
                                fontSize: 25,
                                fontFamily: lib.layout.fontFamily.rounded,
                            }}
                            label="SUCCESS! open in VS Code"
                        />
                    )}

                    <Button
                        onClick={() => {
                            clear();
                        }}
                        buttonStyle={{
                            borderRadius: lib.layout.borderRadius.large,
                            background: lib.colors.primaryColor,
                            marginTop: '20px',
                        }}
                        textStyle={{
                            color: lib.colors.white,
                            fontSize: 15,
                        }}
                        label="clear"
                    />
                </div>
            </div>
        </div>
    ) : null;
};

const AsepriteModal = () => {
    const layers = client.aseprite.useLayers();
    return layers.length === 0 ? <Drop /> : <Confirm />;
};
export default AsepriteModal;
