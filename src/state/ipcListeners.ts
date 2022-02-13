import AppState from './app';

window.dotnugg.on('file-selected', (event, path) => {
    AppState.dispatch.setArtLocation({
        _localStorageTarget: 'artLocation',
        _localStorageValue: path,
        _localStorageExpectedType: 'unique',
    });
});

window.dotnugg.on('items-fetched', (event, items) => {
    AppState.dispatch.setCompiledItems(items);
});

window.dotnugg.on('compiler-error', (event, error) => {
    alert('Dotnugg ' + error);
});

window.dotnugg.on('file-error', (event) => {
    alert('Error locating art');
});

window.dotnugg.on('script-error', (event) => {
    alert('Error converting to dotnugg');
});

window.dotnugg.on('script-success', (event, generated) => {
    // alert(`Success! Check ${generated} to categorize your dotnugg files`);
});

window.dotnugg.on('receive-os', (event, os) => {
    AppState.dispatch.setOS(os);
});
