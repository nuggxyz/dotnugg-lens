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
