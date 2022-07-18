// if (__DEV__) {

// } else {
//     require('./build/server/index.js');
// }
// // require('./server/index.ts');

// eslint-ignore
// require('ts-node').register({
//     project: './server/tsconfig.json',
//     files: ['./server'],
//     options: {
//         experimentalReplAwait: true,
//         experimentalResolver: true,
//         transpileOnly: true,
//         ignoreDiagnostics: [2339],
//     },
// }); // This will register the TypeScript compiler
// require('./server/index.ts');

// globalThis.__DEV__ = process.env.NODE_ENV === 'development';

/* eslint-disable @typescript-eslint/unbound-method */
const path = require('path');
const fs = require('fs');

const ethers = require('ethers');
const os = require('os');
const { exec } = require('child_process');

const { autoUpdater } = require('electron/main');
const { app, BrowserWindow, shell, Menu, ipcMain, dialog } = require('electron');

const { dotnugg } = require('@nuggxyz/dotnugg-sdk');

const __DEV__ = process.env.NODE_ENV === 'development';

console.log({ __DEV__ });

const pathDelimiter = () => {
    return os.platform() === 'win32' ? '\\' : '/';
};

const asepritePath = () => {
    let asepriteLocation = '"/Applications/Aseprite.app/Contents/MacOS/aseprite"';
    if (os.platform() === 'win32') {
        asepriteLocation = '"C:\\Program Files\\Aseprite\\Aseprite.exe"';
    }
    return asepriteLocation;
};

class Main {
    static _window;

    static get window() {
        return Main._window;
    }

    static _watcher;

    static get watcher() {
        return Main._watcher;
    }

    static APP_NAME = 'lens/main';

    static DEFAULT = 'lensDefault';

    static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    static onClose() {
        // Dereference the _window object.
        Main._window = null;
    }

    static onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            Main.onReady();
        }
    }

    static onReady() {
        // console.log(__DEV__, process.env.NODE_ENVIRONMENT);

        Main._window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, './preload.js'),
                nodeIntegration: true,
                // contextIsolation: false,
            },
            icon: path.join(__dirname, 'AppIcon/AppIcon.icns'),
            titleBarStyle: 'hiddenInset',
            titleBarOverlay: true,
            // transparent: true,
        });

        void Main._window.loadURL(
            __DEV__
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, './build/index.html')}`,
        );
        Main._window.maximize();
        Main._window.on('closed', () => Main.onClose());

        if (__DEV__) {
            Main._window.webContents.openDevTools();
        }

        autoUpdater.checkForUpdates();
        Menu.setApplicationMenu(
            Menu.buildFromTemplate([
                {
                    label: app.name,
                    submenu: [
                        {
                            label: 'Go to nugg.xyz...',
                            click: () => {
                                void shell.openExternal('https://www.nugg.xyz');
                            },
                        },
                        {
                            label: 'Go to nuggft interface...',
                            click: () => {
                                void shell.openExternal('https://app.nugg.xyz');
                            },
                        },
                        { type: 'separator' },
                        { role: 'quit' },
                    ],
                },
            ]),
        );
    }

    static main() {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for

        app.on('window-all-closed', Main.onWindowAllClosed);
        app.on('ready', Main.onReady);
        app.on('activate', Main.onActivate);

        void dotnugg.parser.init('lens/main');
    }
}

class IpcListener {
    static register = () => {
        ipcMain.on('select-files', IpcListener.onSelectFiles);
        ipcMain.on('open-to', IpcListener.onOpenTo);
        ipcMain.on('open-to-vscode', IpcListener.onOpenToVsCode);
        ipcMain.on('check-os', IpcListener.onCheckOs);
        ipcMain.on('get-hex', IpcListener.onGetHex);
        ipcMain.on('fetch-compiler-items', IpcListener.onFetchCompilerItems);
        ipcMain.on('clear-cache', IpcListener.onClearCache);
        ipcMain.on('get-lens-default', IpcListener.onGetLensDefault);
        ipcMain.on('list-layers', IpcListener.onListLayers);
    };

    static onSelectFiles = (event) => {
        if (os.platform() === 'linux' || os.platform() === 'win32') {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.sender.send('file-selected', filePaths[0]);
                        // fs.readdir(filePaths[0], (err, list) => {
                        //     if (err) throw err;
                        //     for (let i = 0; i < list.length; i++) {
                        //         if (path.extname(list[i]) === 'collection.nugg') {
                        //             console.log(list[i]);
                        //             return;
                        //         }
                        //     }
                        //     exec(
                        //         `cat "${
                        //             __DEV__
                        //                 ? `lentsDefault${pathDelimiter()}collection.nugg`
                        //                 : path.join(
                        //                       __dirname,
                        //                       `..${pathDelimiter()}lensDefault${pathDelimiter()}collection.nugg`,
                        //                   )
                        //         }" >> "${filePaths[0]}${pathDelimiter()}collection.nugg"`,
                        //     );
                        // });
                    } else {
                        event.sender.send('file-error');
                    }
                });
        } else {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.sender.send('file-selected', filePaths[0]);
                        // fs.readdir(filePaths[0], (err, list) => {
                        //     if (err) throw err;
                        //     for (let i = 0; i < list.length; i++) {
                        //         if (path.extname(list[i]) === 'collection.nugg') {
                        //             console.log(list[i]);
                        //             return;
                        //         }
                        //     }
                        //     exec(
                        //         `cat "${
                        //             __DEV__
                        //                 ? `lentsDefault${pathDelimiter()}collection.nugg`
                        //                 : path.join(
                        //                       __dirname,
                        //                       `..${pathDelimiter()}lensDefault${pathDelimiter()}collection.nugg`,
                        //                   )
                        //         }" >> "${filePaths[0]}${pathDelimiter()}collection.nugg"`,
                        //     );
                        // });
                    } else {
                        throw new Error('No file selected');
                    }
                })
                .catch((err) => {
                    console.log('ERROR: ', err);
                    event.sender.send(err.message);
                });
        }
    };

    static onOpenTo = (event, filePath, application) => {
        if (application) {
            exec(`open -a "${application}" ${filePath.replaceAll(' ', '\\ ')}`);
        } else {
            void shell.openPath(filePath);
        }
    };

    static onOpenToVsCode = (event, filePath) => {
        if (os.platform() === 'win32') {
            exec(`code ${filePath}`);
        } else {
            exec(`open -a "Visual Studio Code" ${filePath.replaceAll(' ', '\\ ')}`);
        }
    };

    static onCheckOs = (event) => {
        event.returnValue = os.platform();
    };

    static onGetHex = (event, item) => {
        try {
            event.returnValue = Main.watcher.builder.hexArray(item);
        } catch (e) {
            event.returnValue = e;
        }
    };

    static onFetchCompilerItems = async (event, filePath, address, apiKey) => {
        try {
            const infura = new ethers.providers.InfuraProvider('goerli', apiKey);

            Main._watcher = dotnugg.watcher.watchNoRender(
                Main.APP_NAME,
                filePath,
                // address,
                // infura,
                (fileUri) => {
                    console.log('###################### FILE ', fileUri);
                    event.sender.send('main-loading');
                },

                async (fileUri, me) => {
                    console.log('######## DONE COMPILING ##########', fileUri);

                    // await me.renderer.wait();

                    IpcListener.formatAndSend(event);
                },

                (error) => {
                    event.sender.send('compiler-error', error);
                },
            );

            // await Main.watcher.renderer.wait();

            IpcListener.formatAndSend(event);
        } catch (e) {
            event.sender.send('compiler-error', `Compilation error: ${e}`);
            alert(e);
        }
    };

    static onConvertAseprite = (event, sourcePath, destPath, layer = '_') => {
        void IpcListener.safeExecAseprite(
            () => {
                try {
                    if (!sourcePath.endsWith('.aseprite')) {
                        throw new Error('Selected file is not an aseprite file');
                    }
                    if (!fs.existsSync(`${destPath}`)) {
                        throw new Error('Incorrect Art Repo');
                    }
                    const filenames = sourcePath.split('.')[0].split(pathDelimiter());
                    const dir = `generated_${filenames[filenames.length - 1]}`;
                    const base = `${destPath}${pathDelimiter()}${dir}`;
                    const count = fs
                        .readdirSync(destPath, { withFileTypes: true })
                        .filter((entry) => entry.isDirectory() && entry.name.includes(dir)).length;
                    exec(`mkdir "${base}_${count + 1}"`);

                    exec(
                        `${asepritePath()} -b --script-param source="${sourcePath}" --script-param dest="${base}_${
                            count + 1
                        }" --script-param layer="${layer}" --script "${
                            __DEV__
                                ? `.${pathDelimiter()}aseprite2dotnugg.lua`
                                : path.join(__dirname, `..${pathDelimiter()}aseprite2dotnugg.lua`)
                        }"`,
                        (error) => {
                            if (error !== null) {
                                throw new Error(error);
                            }
                            // shell.openPath(destPath + '/generated');
                            event.sender.send('script-success', sourcePath, layer);
                        },
                    );
                } catch (e) {
                    event.sender.send('script-error', e, sourcePath);
                }
            },
            sourcePath,
            event,
        );
    };

    static onOpenLink = (event, url) => {
        void shell.openExternal(url);
    };

    static onClearCache = (event, filePath) => {
        const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        exec(`${command} ${path.join(filePath, '.dotnugg-cache')}`);
    };

    static onListLayers = (event, filePath) => {
        IpcListener.safeExecAseprite(
            () => {
                try {
                    exec(
                        `${asepritePath()} -b --all-layers --list-layers "${filePath}"`,
                        (error, stdout) => {
                            if (error !== null) {
                                throw new Error(error);
                            }
                            event.sender.send('layers', filePath, stdout);
                        },
                    );
                } catch (e) {
                    event.sender.send('script-error', e);
                }
            },
            filePath,
            event,
        );
    };

    static onGetLensDefault = (event) => {
        event.returnValue = path.join(
            __dirname,
            __DEV__ ? '' : `..${pathDelimiter()}`,
            Main.DEFAULT,
        );
    };

    static safeExecAseprite = (callback, filePath, event) => {
        const command =
            os.platform() === 'win32'
                ? `if exist ${asepritePath()} echo TRUE`
                : `test -f ${asepritePath()} && echo TRUE`;
        return exec(command, (error, stdout) => {
            if (stdout === 'TRUE\n' || stdout === 'TRUE\r\n') {
                callback();
            } else {
                event.sender.send(
                    'script-error',
                    `Please make sure you have downloaded the *paid version* of Aseprite to ${asepritePath()}, ${stdout}, ${
                        stdout === 'TRUE' ? 'true' : 'false'
                        /// @danny7even what is the logic supposed to be here?
                    } ${stdout === 'TRUE\n' ? 'true' : 'false'}`,
                    filePath,
                );
            }
            return stdout;
        });
    };

    static formatAndSend = (event) => {
        if (Main.watcher.builder.output) {
            event.sender.send(
                'items-fetched',
                Main.watcher.builder.output,
                Main.watcher.parsedDocument,
            );
        } else {
            event.sender.send('compiler-error', 'Error: unknown error while compiling files');
        }
    };
}

Main.main();
IpcListener.register();
