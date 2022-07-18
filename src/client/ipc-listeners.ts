import { Document } from '@nuggxyz/dotnugg-sdk/dist/builder/types/TransformTypes';

import client from '@src/client';

import { Layer } from './aseprite';
import { Item } from './compiled';

// window.dotnugg.selectFiles();

window.dotnugg.on('file-selected', (event, path: string) => {
    client.compiled.useStore.getState().updateArtDir(path);
});

window.dotnugg.on('items-fetched', (event, items: Item[], doc: Document) => {
    client.compiled.useStore.getState().updateMainLoading(false);
    client.compiled.useStore.getState().udpate(items, doc);
});

window.dotnugg.on('compiler-error', (event, error: Error) => {
    client.compiled.useStore.getState().updateMainLoading(false);
    alert(`Dotnugg ${error as unknown as string}`);
});

window.dotnugg.on('file-error', () => {
    alert('Error locating art');
});

window.dotnugg.on('script-error', (event, error: string, file: string) => {
    client.compiled.useStore.getState().updateMainLoading(false);
    client.aseprite.useStore.getState().onError(file, error);
    console.error(error);
    alert(`Error converting to dotnugg [${file}]: ${error as unknown as string}`);
});

window.dotnugg.on('script-success', () => {
    client.aseprite.useStore.getState().onSuccess();

    // window.dotnugg.openToVSCode(file);
    //  alert(`Success! Check ${generated} to categorize your dotnugg files`);
});

window.dotnugg.on('layers', (event, path: string, layers: string) => {
    console.log(layers);

    client.aseprite.useStore.getState().onLayersFound(
        path,
        layers.split('\n').reduce((accumulator, layer) => {
            if (layer) {
                accumulator.push({
                    path: layer,
                    compiled: false,
                    loading: false,
                });
            }
            return accumulator;
        }, [] as Layer[]),
    );
});

window.dotnugg.on('main-loading', () => {
    client.compiled.useStore.getState().updateMainLoading(true);
});
