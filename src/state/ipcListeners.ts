import { isUndefinedOrNullOrStringEmpty } from '../lib';

import AppState from './app';

window.dotnugg.on('file-selected', (event, path) => {
    AppState.dispatch.setArtLocation({
        _localStorageTarget: 'artLocation',
        _localStorageValue: path,
        _localStorageExpectedType: 'unique',
    });
});

window.dotnugg.on('items-fetched', (event, items, renderData) => {
    AppState.dispatch.setMainProcessLoading(false);
    AppState.dispatch.setCompiledItems({ items, renderData });
});

window.dotnugg.on('compiler-error', (event, error) => {
    AppState.dispatch.setMainProcessLoading(false);
    alert('Dotnugg ' + error);
});

window.dotnugg.on('file-error', (event) => {
    alert('Error locating art');
});

window.dotnugg.on('script-error', (event, error, file) => {
    AppState.dispatch.setMainProcessLoading(false);
    AppState.dispatch.updateAsepriteFiles({
        path: file,
        loading: false,
        compiled: false,
    });
    alert('Error converting to dotnugg: ' + error);
});

window.dotnugg.on('script-success', (event, file, layer) => {
    AppState.dispatch.setMainProcessLoading(false);
    if (layer === '_') {
        AppState.dispatch.updateAsepriteFiles({
            path: file,
            loading: false,
            compiled: true,
            options: {
                layers: {
                    loading: false,
                    compiled: true,
                },
            },
        });
    } else {
        AppState.dispatch.updateAsepriteLayer({
            file,
            layer: {
                path: layer,
                loading: false,
                compiled: true,
            },
        });
    }
    // alert(`Success! Check ${generated} to categorize your dotnugg files`);
});

window.dotnugg.on('receive-os', (event, os) => {
    AppState.dispatch.setOS(os);
});

window.dotnugg.on('layers', (event, path, layers) => {
    AppState.dispatch.updateAsepriteFiles({
        path,
        layers: layers.split('\n').reduce((accumulator, layer) => {
            if (!isUndefinedOrNullOrStringEmpty(layer)) {
                accumulator.push({
                    path: layer,
                    compiled: false,
                    loading: false,
                });
            }
            return accumulator;
        }, []),
    });
});
