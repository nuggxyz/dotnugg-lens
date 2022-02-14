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
        openTo: (path) => {
            ipcRenderer.send('open-to', path);
        },
        checkOs: () => {
            ipcRenderer.send('check-os');
        },
        convertAseprite: (sourcePath, destPath) => {
            ipcRenderer.send('convert-aseprite', sourcePath, destPath);
        },
    });
});
