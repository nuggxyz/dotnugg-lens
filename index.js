const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const { dotnugg } = require('@nuggxyz/dotnugg-sdk');
const ethers = require('ethers');
const fixPath = require('fix-path');
fixPath();
// const {
//     dotnugg,
// } = require('/Users/***REMOVED***/Work/***REMOVED***/nuggxyz/dotnugg-sdk/dist/index.js');

function createWindow() {
    const win = new BrowserWindow({
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
}
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

ipcMain.on('select-files', function (event) {
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
                    fs.readdir(filePaths[0], function (err, list) {
                        if (err) throw err;
                        for (var i = 0; i < list.length; i++) {
                            if (path.extname(list[i]) === 'collection.nugg') {
                                console.log(list[i]);
                                return;
                            }
                        }
                        console.log(filePaths[0]);
                        exec(
                            `cat "${
                                isDev
                                    ? 'collection.nugg'
                                    : path.join(__dirname, '../collection.nugg')
                            }" >> "${filePaths[0]}/collection.nugg"`,
                        );
                    });
                } else event.reply('file-error');
            });
    }
});

ipcMain.on('open-to', function (event, path, application) {
    if (application) {
        console.log(`open -a "${application}" ${path}`);
        exec(`open -a "${application}" ${path}`);
    } else {
        shell.openPath(path);
    }
});

ipcMain.on('verify-file', function (event, file) {});

ipcMain.on('check-os', function (event) {
    event.reply('receive-os', os.platform());
});

ipcMain.on(
    'fetch-compiler-items',
    async function (event, path, address, apiKey) {
        try {
            await dotnugg.compiler.init();
            const compiler =
                await dotnugg.compiler.compileDirectoryCheckCacheAndRender(
                    address,
                    new ethers.providers.InfuraProvider('goerli', apiKey),
                    path,
                );

            if (compiler.outputByItem) {
                event.reply(
                    'items-fetched',
                    compiler.outputByItem,
                    compiler.render,
                );
            } else {
                event.reply(
                    'compiler-error',
                    'Error: unknown error while compiling files',
                );
            }
        } catch (e) {
            event.reply('compiler-error', e);
        }
    },
);

function asepritePath() {
    let asepriteLocation = '/Applications/Aseprite.app/Contents/MacOS/aseprite';
    if (os.platform() === 'win32') {
        asepriteLocation = 'C:\\Program Files\\Aseprite\\Aseprite.exe';
    }
    return asepriteLocation;
}

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
                    `${destPath}/generated_${filenames[filenames.length - 1]}"`,
                )
            ) {
                exec(
                    `mkdir "${destPath}/generated_${
                        filenames[filenames.length - 1]
                    }"`,
                );
            } else if (!fs.existsSync(`${destPath}`)) {
                throw new Error('Incorrect Art Repo');
            }
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
                    // shell.openPath(destPath + '/generated');
                    event.reply('script-success', sourcePath, layer);
                },
            );
        } catch (e) {
            event.reply('script-error', e, sourcePath);
        }
    },
);

ipcMain.on('open-link', function (event, url) {
    shell.openExternal(url);
});

ipcMain.on('clear-cache', function (event, path) {
    exec(`rm -rf ${path.replaceAll(' ', '\\ ')}/dotnugg**.cache.json`);
});

ipcMain.on('list-layers', function (event, path) {
    const yo = exec(
        `${asepritePath()} -b --all-layers --list-layers "${path}"`,
        (error, stdout, stderr) => {
            if (error !== null) {
                throw new Error(error);
            }
            event.reply('layers', path, stdout);
        },
    );
});
