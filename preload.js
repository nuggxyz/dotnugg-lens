process.once('loaded', () => {
    const { contextBridge, ipcRenderer } = require('electron');

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
