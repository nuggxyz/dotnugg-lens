const path = require('path');
const os = require('os');

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { dotnugg } = require('@nuggxyz/dotnugg-sdk');
const isDev = require('electron-is-dev');

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

app.whenReady().then(createWindow);

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
            });
    } else {
        dialog
            .showOpenDialog({
                properties: ['openFile', 'openDirectory'],
            })
            .then(({ filePaths }) => {
                if (filePaths) event.reply('file-selected', filePaths[0]);
            });
    }
});

ipcMain.on('fetch-compiler-items', async function (event, path) {
    await dotnugg.compiler.init();
    const compiler = dotnugg.compiler.compileDirectoryWithCache(path);

    event.reply('items-fetched', compiler.outputByItem);
});
