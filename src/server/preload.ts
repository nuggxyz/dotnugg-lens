process.once('loaded', () => {
    void import('electron').then(({ contextBridge, ipcRenderer }) => {
        contextBridge.exposeInMainWorld('dotnugg', {
            createCompiler: (path: string, address: string, apiKey: string) => {
                ipcRenderer.send('fetch-compiler-items', path, address, apiKey);
            },
            on: (eventName: string, callback: () => void) => {
                ipcRenderer.on(eventName, callback);
            },
            send: (eventName: string) => {
                ipcRenderer.send(eventName);
            },
            selectFiles: () => {
                ipcRenderer.send('select-files');
            },
            verifyFile: (path: string) => {
                ipcRenderer.send('verify-file', path);
            },
            openTo: (path: string, application: string) => {
                ipcRenderer.send('open-to', path, application);
            },
            openToVSCode: (path: string) => {
                ipcRenderer.send('open-to-vscode', path);
            },
            openLink: (url: string) => {
                ipcRenderer.send('open-link', url);
            },
            clearCache: (path: string) => {
                ipcRenderer.send('clear-cache', path);
            },
            checkOs: () => {
                ipcRenderer.sendSync('check-os');
            },
            convertAseprite: (sourcePath: string, destPath: string, id: string, layer: string) => {
                ipcRenderer.send('convert-aseprite', sourcePath, destPath, id, layer);
            },
            listLayers: (path: string) => {
                ipcRenderer.send('list-layers', path);
            },
            getHex: (feature: string, id: string, path: string) => {
                ipcRenderer.sendSync('get-hex', feature, id, path);
            },
            getLensDefault: () => {
                ipcRenderer.sendSync('get-lens-default');
            },
        });
    });
});

export {};
