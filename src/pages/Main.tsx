import * as React from 'react';

import AppState from '../state/app';
import {
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
} from '../lib';
import Button from '../components/general/Buttons/Button/Button';
import constants from '../lib/constants';
import Text from '../components/general/Texts/Text/Text';
import List from '../components/general/List/List';
import Colors from '../lib/colors';
import { DotnuggV1Helper } from '../contracts/DotnuggHelper';
import Loader from '../components/general/Loader/Loader';

import Connect from './Connect';

const Main = () => {
    const apiKey = AppState.select.apiKey();
    const items = AppState.select.compiledItems();

    const [selectedItems, setSelectedItems] = React.useState([]);
    const [svg, setSvg] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    return !isUndefinedOrNullOrStringEmpty(apiKey) ? (
        <div
            style={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
            }}>
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
            {isUndefinedOrNullOrObjectEmpty(items) ? (
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
                {Object.keys(items).map((feature, index) => (
                    <div style={{ height: '500px' }} key={index}>
                        <Text>{constants.DOTNUGG_ITEMS[feature]}</Text>
                        <List
                            extraData={[selectedItems, setSelectedItems]}
                            data={Object.values(items[feature])}
                            RenderItem={RenderItem}
                        />
                    </div>
                ))}
            </div>
            {svg && (
                <img src={svg} style={{ height: '550px', width: '550px' }} />
            )}
        </div>
    ) : (
        <Connect />
    );
};

export default Main;

const RenderItem = ({ item, extraData, index }) => {
    const [svg, setSvg] = React.useState('');
    const selectedItems = extraData[0];
    // React.useEffect(() => {
    //     DotnuggV1Helper.instance.sim([item.hex]).then((svg) => setSvg(svg));
    // }, [item, selectedItems]);
    return (
        <Button
            buttonStyle={{
                background: !isUndefinedOrNullOrObjectEmpty(
                    selectedItems.find(
                        (listItem) => item.fileName === listItem.fileName,
                    ),
                )
                    ? Colors.nuggBlueSemiTransparent
                    : 'white',
            }}
            label={item.fileName}
            onClick={() => {
                extraData[1]((items) => {
                    return items.toggle(item, 'fileName');
                });
            }}
            // rightIcon={
            //     <img
            //         src={svg}
            //         style={{
            //             height: '150px',
            //             width: '150px',
            //         }}
            //     />
            // }
        />
    );
};
