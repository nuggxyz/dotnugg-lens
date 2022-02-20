const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
// const { dotnugg } = require('@nuggxyz/dotnugg-sdk');
const ethers = require('ethers');
const fixPath = require('fix-path');

// const {
//     dotnugg,
// } = require('/Users/remymcconnell/Work/dhlabs/nuggxyz/dotnugg-sdk/dist/index.js');

fixPath();

const APP_NAME = 'lens/main';
const DEFAULT = 'lensDefault';
let win;
let watcher;

// FUNCTIONS

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: path.join(__dirname, 'AppIcon/AppIcon.icns'),
        titleBarStyle: 'hidden',
    });

    win.maximize();

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, 'build/index.html')}`,
    );
    if (isDev) {
        win.webContents.openDevTools();
    }
};

const asepritePath = () => {
    let asepriteLocation = '/Applications/Aseprite.app/Contents/MacOS/aseprite';
    if (os.platform() === 'win32') {
        asepriteLocation = 'C:\\Program Files\\Aseprite\\Aseprite.exe';
    }
    return asepriteLocation;
};

const formatAndSend = async (builder, renderer) => {
    const res = Object.entries(builder.outputByItemIndex).map(
        ([key, value]) => {
            return {
                title: key,
                items: Object.values(value).map((item) => {
                    return {
                        ...builder.output[item],
                        svg: renderer.results[builder.output[item].fileUri]
                            .data,
                    };
                }),
            };
        },
    );
    if (res) {
        win.webContents.send('items-fetched', res);
    } else {
        win.webContents.send(
            'compiler-error',
            'Error: unknown error while compiling files',
        );
    }
};

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

try {
    require('electron-reloader')(module);
} catch (_) {}

ipcMain.on('select-files', (event) => {
    if (os.platform() === 'linux' || os.platform() === 'win32') {
        dialog
            .showOpenDialog({
                properties: ['openFile'],
            })
            .then(({ filePaths }) => {
                if (filePaths) event.reply('file-selected', filePaths[0]);
                else event.reply('file-error');
            });
    } else {
        dialog
            .showOpenDialog({
                properties: ['openDirectory'],
            })
            .then(({ filePaths }) => {
                if (filePaths) {
                    event.reply('file-selected', filePaths[0]);
                    fs.readdir(filePaths[0], (err, list) => {
                        if (err) throw err;
                        for (var i = 0; i < list.length; i++) {
                            if (path.extname(list[i]) === 'collection.nugg') {
                                console.log(list[i]);
                                return;
                            }
                        }
                        exec(
                            `cat "${
                                isDev
                                    ? 'lentsDefault/collection.nugg'
                                    : path.join(
                                          __dirname,
                                          '../lensDefault/collection.nugg',
                                      )
                            }" >> "${filePaths[0]}/collection.nugg"`,
                        );
                    });
                } else {
                    event.reply('file-error');
                }
            });
    }
});

ipcMain.on('open-to', function (event, path, application) {
    if (application) {
        exec(`open -a "${application}" ${path.replaceAll(' ', '\\ ')}`);
    } else {
        shell.openPath(path);
    }
});

ipcMain.on('check-os', function (event) {
    event.returnValue = os.platform();
});

ipcMain.on('get-hex', (event, item, path) => {
    try {
        event.returnValue = watcher.builder.hexArray(item);
    } catch (e) {
        event.returnValue = e;
    }
});

ipcMain.on(
    'fetch-compiler-items',
    async function (event, path, address, apiKey) {
        try {
            const infura = new ethers.providers.InfuraProvider(
                'goerli',
                apiKey,
            );

            await dotnugg.parser.init(APP_NAME);

            watcher = dotnugg.watcher.watch(
                APP_NAME,
                path,
                address,
                infura,
                (fileUri, me) => {
                    console.log('###################### FILE ', fileUri);
                    win.webContents.send('main-loading');
                },
                async (fileUri, me) => {
                    console.log('######## DONE COMPILING ##########', fileUri);

                    await me.renderer.wait();

                    formatAndSend(me.builder, me.renderer);
                },
            );

            await watcher.renderer.wait();

            formatAndSend(watcher.builder, watcher.renderer);
        } catch (e) {
            event.reply('compiler-error', e);
        }
    },
);

ipcMain.on(
    'convert-aseprite',
    async function (event, sourcePath, destPath, layer = '_') {
        try {
            if (!sourcePath.endsWith('.aseprite')) {
                throw new Error('Selected file is not an aseprite file');
            }
            let filenames = sourcePath.split('.')[0].split('/');
            if (
                fs.existsSync(`${destPath}`) &&
                !fs.existsSync(
                    `${destPath}/generated_${filenames[filenames.length - 1]}`,
                )
            ) {
                console.log('------------------ 3 ---------------');
                exec(
                    `mkdir "${destPath}/generated_${
                        filenames[filenames.length - 1]
                    }"`,
                );
            } else if (!fs.existsSync(`${destPath}`)) {
                throw new Error('Incorrect Art Repo');
            }

            console.log('------------------ 4 ---------------');
            exec(
                `${asepritePath()} -b --script-param source="${sourcePath}" --script-param dest="${destPath}" --script-param layer="${layer}" --script "${
                    isDev
                        ? './aseprite2dotnugg.lua'
                        : path.join(__dirname, '../aseprite2dotnugg.lua')
                }"`,
                (error) => {
                    if (error !== null) {
                        throw new Error(error);
                    }

                    console.log('------------------ 5 ---------------');
                    // shell.openPath(destPath + '/generated');
                    event.reply('script-success', sourcePath, layer);
                },
            );

            console.log('------------------ 6b---------------');
        } catch (e) {
            event.reply('script-error', e, sourcePath);
        }
    },
);

ipcMain.on('open-link', (event, url) => {
    shell.openExternal(url);
});

ipcMain.on('clear-cache', (event, path) => {
    exec(`rm -rf ${path.replaceAll(' ', '\\ ')}/.dotnugg-cache`);
});

ipcMain.on('list-layers', (event, path) => {
    exec(
        `${asepritePath()} -b --all-layers --list-layers "${path}"`,
        (error, stdout, stderr) => {
            if (error !== null) {
                throw new Error(error);
            }
            event.reply('layers', path, stdout);
        },
    );
});

ipcMain.on('get-lens-default', (event) => {
    event.returnValue = path.join(__dirname, isDev ? '' : '../', DEFAULT);
});
