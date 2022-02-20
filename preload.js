// import { contextBridge, ipcRenderer } from 'electron';
process.once('loaded', () => {
    const { contextBridge, ipcRenderer } = require('electron');

    contextBridge.exposeInMainWorld('dotnugg', {
        createCompiler: (path, address, apiKey) => {
            ipcRenderer.send('fetch-compiler-items', path, address, apiKey);
        },
        on: (eventName, callback) => {
            ipcRenderer.on(eventName, callback);
        },
        send: (eventName) => {
            ipcRenderer.send(eventName);
        },
        selectFiles: () => {
            ipcRenderer.send('select-files');
        },
        verifyFile: (path) => {
            ipcRenderer.send('verify-file', path);
        },
        openTo: (path, application) => {
            ipcRenderer.send('open-to', path, application);
        },
        openLink: (url) => {
            ipcRenderer.send('open-link', url);
        },
        clearCache: (path) => {
            ipcRenderer.send('clear-cache', path);
        },
        checkOs: () => {
            return ipcRenderer.sendSync('check-os');
        },
        convertAseprite: (sourcePath, destPath, layer) => {
            ipcRenderer.send('convert-aseprite', sourcePath, destPath, layer);
        },
        listLayers: (path) => {
            ipcRenderer.send('list-layers', path);
        },
        getHex: (feature, id, path) => {
            return ipcRenderer.sendSync('get-hex', feature, id, path);
        },
        getLensDefault: () => {
            return ipcRenderer.sendSync('get-lens-default');
        },
    });
});
