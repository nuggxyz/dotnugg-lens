const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
const { dotnugg } = require('@nuggxyz/dotnugg-sdk');
// const {
//     dotnugg,
// } = require('/Users/remymcconnell/Work/dhlabs/nuggxyz/dotnugg-sdk/dist/index.js');

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
                if (filePaths) event.reply('file-selected', filePaths[0]);
                else event.reply('file-error');
            });
    }
});

ipcMain.on('open-to', function (event, path) {
    shell.openPath(path);
});

ipcMain.on('verify-file', function (event, file) {});

ipcMain.on('check-os', function (event) {
    event.reply('receive-os', os.platform());
});

ipcMain.on('fetch-compiler-items', async function (event, path) {
    try {
        await dotnugg.compiler.init();
        const compiler = dotnugg.compiler.compileDirectoryCheckCache(path);

        if (compiler.outputByItem) {
            event.reply('items-fetched', compiler.outputByItem);
        } else {
            event.reply(
                'compiler-error',
                'Error: unknown error while compiling files',
            );
        }
    } catch (e) {
        event.reply('compiler-error', e);
    }
});

ipcMain.on('convert-aseprite', async function (event, sourcePath, destPath) {
    try {
        let asepriteLocation =
            '/Applications/Aseprite.app/Contents/MacOS/aseprite';
        if (os.platform() === 'win32') {
            asepriteLocation = 'C:\\Program Files\\Aseprite\\Aseprite.exe';
        }
        if (!sourcePath.endsWith('.aseprite')) {
            throw new Error('Selected file is not an aseprite file');
        }
        if (!fs.existsSync(destPath + '/generated')) {
            exec(`mkdir ${destPath}/generated`);
        }
        exec(
            asepriteLocation +
                ' -b --script-param source="' +
                sourcePath +
                '" --script-param dest="' +
                destPath +
                '" --script aseprite2dotnugg.lua',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                console.log(error);
                if (error !== null) {
                    throw new Error(error);
                }
                shell.openPath(destPath + '/generated');
                event.reply('script-success', sourcePath);
            },
        );
    } catch (e) {
        event.reply('script-error', e, sourcePath);
    }
});
