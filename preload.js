process.once('loaded', () => {
    const { contextBridge, ipcRenderer } = require('electron');
    const { dotnugg } = require('@nuggxyz/dotnugg-sdk');

    contextBridge.exposeInMainWorld('dotnugg', {
        createCompiler: (path) => {
            console.log(path);
            ipcRenderer.send('fetch-compiler-items', path);
        },
        on(eventName, callback) {
            ipcRenderer.on(eventName, callback);
        },
        send(eventName) {
            ipcRenderer.send(eventName);
        },
        selectFiles() {
            ipcRenderer.send('select-files');
        },
    });
});
