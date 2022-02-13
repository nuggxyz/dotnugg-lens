import * as React from 'react';
import { IoClose, IoCreateOutline, IoDocument, IoPower } from 'react-icons/io5';

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
import List from '../../components/general/List/List';
import Colors from '../../lib/colors';
import { DotnuggV1Helper } from '../../contracts/DotnuggHelper';
import Loader from '../../components/general/Loader/Loader';
import Dropzone from '../../components/nugg/Dropzone/Dropzone';
import AsepriteButton from '../../components/nugg/AsepriteButton/AsepriteButton';
import InteractiveText from '../../components/general/Texts/InteractiveText/InteractiveText';
import ArtRepoHandler from '../../components/nugg/ArtRepoHandler/ArtRepoHandler';
import StickyList from '../../components/general/List/StickyList';
import globalStyles from '../../lib/globalStyles';
import Layout from '../../lib/layout';
import NuggAssembler from '../../components/nugg/NuggAssembler/NuggAssembler';

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
            onDrop={(files) => AppState.dispatch.addToAsepriteFiles(files)}>
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
            {isUndefinedOrNullOrStringEmpty(artLocation) && (
                <Button
                    textStyle={styles.artLocationPicker}
                    buttonStyle={styles.buttonLong}
                    label="Select Art Directory"
                    onClick={() => window.dotnugg.selectFiles()}
                />
            )}
            <NuggAssembler data={formattedCompiledItems} />
            {/* <div
                style={{
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                }}>
                <Button
                    label="Open art repo"
                    onClick={() => window.dotnugg.openTo(dest)}
                />
                <Button
                    label="Clear Api Key"
                    onClick={() =>
                        AppState.dispatch.setApiKey({
                            _localStorageTarget: 'apiKey',
                            _localStorageExpectedType: 'unique',
                            _localStorageValue: '',
                        })
                    }
                />
                {isUndefinedOrNullOrArrayEmpty(compiledItems) ? (
                    <Button
                        label="Locate Art Repo"
                        onClick={() => window.dotnugg.selectFiles()}
                    />
                ) : (
                    <Button
                        label="Replace Art Repo"
                        onClick={() => {
                            AppState.dispatch.setArtLocation({
                                _localStorageTarget: 'artLocation',
                                _localStorageExpectedType: 'unique',
                                _localStorageValue: '',
                            });
                            window.dotnugg.selectFiles();
                        }}
                    />
                )}
                <Button
                    label="GET THE NUGG"
                    onClick={() => {
                        setLoading(true);
                        DotnuggV1Helper.instance
                            .sim(selectedItems.map((item) => item.hex))
                            .then((svg) => setSvg(svg))
                            .catch((e) => alert(e))
                            .finally(() => setLoading(false));
                    }}
                    rightIcon={loading && <Loader />}
                />
                <div style={{ display: 'flex', overflow: 'scroll' }}>
                    {Object.keys(compiledItems).map((feature, index) => (
                        <div style={{ height: '500px' }} key={index}>
                            <Text>{constants.DOTNUGG_ITEMS[feature]}</Text>
                            <List
                                extraData={[selectedItems, setSelectedItems]}
                                data={Object.values(compiledItems[feature])}
                                RenderItem={RenderItem}
                            />
                        </div>
                    ))}
                </div>
                {svg && (
                    <img
                        src={svg}
                        style={{ height: '550px', width: '550px' }}
                    />
                )}
                <div>
                    {asepriteFiles.map((file) => (
                        <AsepriteButton file={file} />
                    ))}
                </div>
            </div> */}
        </Dropzone>
    );
};

export default Main;
