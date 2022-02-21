const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');

const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    shell,
    Menu,
} = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const { dotnugg } = require('@nuggxyz/dotnugg-sdk');
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
        titleBarStyle: 'hiddenInset',
        titleBarOverlay: true,
        // transparent: true,
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
    let asepriteLocation =
        '"/Applications/Aseprite.app/Contents/MacOS/aseprite"';
    if (os.platform() === 'win32') {
        asepriteLocation = '"C:\\Program Files\\Aseprite\\Aseprite.exe"';
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

const safeExecAseprite = (callback, path) => {
    const command =
        os.platform() === 'win32'
            ? `if exist ${asepritePath()} echo TRUE`
            : `test -f ${asepritePath()} && echo TRUE`;
    return exec(command, (error, stdout) => {
        if (stdout === 'TRUE\n' || stdout === 'TRUE\r\n') {
            callback();
        } else {
            win.webContents.send(
                'script-error',
                `Please make sure you have downloaded the *paid version* of Aseprite to ${asepritePath()}, ${stdout}, ${
                    stdout === 'TRUE'
                } ${stdout === 'TRUE\n'}`,
                path,
            );
        }
        return stdout;
    });
};

const pathDelimiter = () => {
    return os.platform() === 'win32' ? '\\' : '/';
};

// Listeners

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            {
                label: app.name,
                submenu: [
                    {
                        label: 'Go to nugg.xyz...',
                        click: async () => {
                            await shell.openExternal('https://www.nugg.xyz');
                        },
                    },
                    {
                        label: 'Go to nuggft interface...',
                        click: async () => {
                            await shell.openExternal('https://app.nugg.xyz');
                        },
                    },
                    { type: 'separator' },
                    { role: 'quit' },
                ],
            },
        ]),
    );
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
                                    ? `lentsDefault${pathDelimiter()}collection.nugg`
                                    : path.join(
                                          __dirname,
                                          `..${pathDelimiter()}lensDefault${pathDelimiter()}collection.nugg`,
                                      )
                            }" >> "${
                                filePaths[0]
                            }${pathDelimiter()}collection.nugg"`,
                        );
                    });
                } else {
                    event.reply('file-error');
                }
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
                                    ? `lentsDefault${pathDelimiter()}collection.nugg`
                                    : path.join(
                                          __dirname,
                                          `..${pathDelimiter()}lensDefault${pathDelimiter()}collection.nugg`,
                                      )
                            }" >> "${
                                filePaths[0]
                            }${pathDelimiter()}collection.nugg"`,
                        );
                    });
                } else {
                    event.reply('file-error');
                }
            });
    }
});

ipcMain.on('open-to', (event, path, application) => {
    if (application) {
        exec(`open -a "${application}" ${path.replaceAll(' ', '\\ ')}`);
    } else {
        shell.openPath(path);
    }
});

ipcMain.on('open-to-vscode', (event, path) => {
    if (os.platform() === 'win32') {
        exec(`code ${path}`);
    } else {
        exec(`open -a "Visual Studio Code" ${path.replaceAll(' ', '\\ ')}`);
    }
});

ipcMain.on('check-os', (event) => {
    event.returnValue = os.platform();
});

ipcMain.on('get-hex', (event, item, path) => {
    try {
        event.returnValue = watcher.builder.hexArray(item);
    } catch (e) {
        event.returnValue = e;
    }
});

ipcMain.on('fetch-compiler-items', async (event, path, address, apiKey) => {
    try {
        const infura = new ethers.providers.InfuraProvider('goerli', apiKey);

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
            (error) => {
                win.webContents.send('compiler-error', error);
            },
        );

        await watcher.renderer.wait();

        formatAndSend(watcher.builder, watcher.renderer);
    } catch (e) {
        event.reply('compiler-error', `Compilation error: ${e}`);
    }
});

ipcMain.on(
    'convert-aseprite',
    async (event, sourcePath, destPath, layer = '_') => {
        safeExecAseprite(() => {
            try {
                if (!sourcePath.endsWith('.aseprite')) {
                    throw new Error('Selected file is not an aseprite file');
                }
                let filenames = sourcePath.split('.')[0].split(pathDelimiter());
                if (
                    fs.existsSync(`${destPath}`) &&
                    !fs.existsSync(
                        `${destPath}${pathDelimiter()}generated_${
                            filenames[filenames.length - 1]
                        }`,
                    )
                ) {
                    exec(
                        `mkdir "${destPath}${pathDelimiter()}generated_${
                            filenames[filenames.length - 1]
                        }"`,
                    );
                } else if (!fs.existsSync(`${destPath}`)) {
                    throw new Error('Incorrect Art Repo');
                }

                exec(
                    `${asepritePath()} -b --script-param source="${sourcePath}" --script-param dest="${destPath}" --script-param layer="${layer}" --script "${
                        isDev
                            ? `.${pathDelimiter()}aseprite2dotnugg.lua`
                            : path.join(
                                  __dirname,
                                  `..${pathDelimiter()}aseprite2dotnugg.lua`,
                              )
                    }"`,
                    (error) => {
                        if (error !== null) {
                            throw new Error(error);
                        }
                        // shell.openPath(destPath + '/generated');
                        win.webContents.send(
                            'script-success',
                            sourcePath,
                            layer,
                        );
                    },
                );
            } catch (e) {
                win.webContents.send('script-error', e, sourcePath);
            }
        }, sourcePath);
    },
);

ipcMain.on('open-link', (event, url) => {
    shell.openExternal(url);
});

ipcMain.on('clear-cache', (event, _path) => {
    const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
    exec(`${command} ${path.join(_path, '.dotnugg-cache')}`);
});

ipcMain.on('list-layers', (event, path) => {
    safeExecAseprite(() => {
        try {
            exec(
                `${asepritePath()} -b --all-layers --list-layers "${path}"`,
                (error, stdout, stderr) => {
                    if (error !== null) {
                        throw new Error(error);
                    }
                    win.webContents.send('layers', path, stdout);
                },
            );
        } catch (e) {
            win.webContents.send('script-error', e);
        }
    }, path);
});

ipcMain.on('get-lens-default', (event) => {
    event.returnValue = path.join(
        __dirname,
        isDev ? '' : `..${pathDelimiter()}`,
        DEFAULT,
    );
});
