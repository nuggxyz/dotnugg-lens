import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';

import client from '@src/client';

export type Item = {
    title: string;
    items: (Output & { svg: string; title: string | undefined })[];
};

// window.dotnugg.selectFiles();

window.dotnugg.on('file-selected', (event, path: string) => {
    client.keys.useStore.getState().updateArtDir(path);
});

window.dotnugg.on('items-fetched', (event, items: Item[]) => {
    client.keys.useStore.getState().updateMainIsLoading(false);
    client.compiled.useStore.getState().udpate(items);
});

window.dotnugg.on('compiler-error', (event, error: Error) => {
    client.keys.useStore.getState().updateMainIsLoading(false);
    alert(`Dotnugg ${error.message}`);
});

window.dotnugg.on('file-error', () => {
    alert('Error locating art');
});

window.dotnugg.on('script-error', (event, error, file: string) => {
    client.keys.useStore.getState().updateMainIsLoading(false);
    // AppState.dispatch.updateAsepriteFiles({
    //     path: file,
    //     loading: false,
    //     compiled: false,
    // });
    alert(`Error converting to dotnugg [${file}]: ${error as unknown as string}`);
});

// window.dotnugg.on('script-success', (event, file: string, layer) => {
//     const state = store.getState().app;
//     AppState.dispatch.setMainProcessLoading(false);

//     if (layer === '_') {
//         AppState.dispatch.addToastToList({
//             duration: 0,
//             error: false,
//             id: `${file}-${state.toasts.length}`,
//             title: `Success (${getFileFromPath(file)})`,
//             loading: false,
//             message: `Click to configure your .nugg files in VS Code`,
//             index: state.toasts.length,
//             action: (setClose) => {
//                 setClose(true);
//                 window.dotnugg.openToVSCode(state.artLocation);
//             },
//         });
//         AppState.dispatch.updateAsepriteFiles({
//             path: file,
//             loading: false,
//             compiled: true,
//             options: {
//                 layers: {
//                     loading: false,
//                     compiled: true,
//                 },
//             },
//         });
//     } else {
//         AppState.dispatch.addToastToList({
//             duration: 0,
//             error: false,
//             id: `${layer}-${state.toasts.length}`,
//             title: `Success (${layer})`,
//             loading: false,
//             message: 'Click to configure your .nugg file in VS Code',
//             index: state.toasts.length,
//             action: (setClose) => {
//                 setClose(true);
//                 window.dotnugg.openToVSCode(state.artLocation);
//             },
//         });
//         AppState.dispatch.updateAsepriteLayer({
//             file,
//             layer: {
//                 path: layer,
//                 loading: false,
//                 compiled: true,
//             },
//         });
//     }
//     // alert(`Success! Check ${generated} to categorize your dotnugg files`);
// });

// window.dotnugg.on('layers', (event, path, layers) => {
//     console.log(layers);
//     AppState.dispatch.updateAsepriteFiles({
//         path,
//         layers: layers.split('\n').reduce((accumulator, layer) => {
//             if (!isUndefinedOrNullOrStringEmpty(layer)) {
//                 accumulator.push({
//                     path: layer,
//                     compiled: false,
//                     loading: false,
//                 });
//             }
//             return accumulator;
//         }, []),
//     });
// });

window.dotnugg.on('main-loading', () => {
    client.keys.useStore.getState().updateMainIsLoading(true);
});
