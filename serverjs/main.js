/* eslint-disable @typescript-eslint/unbound-method */
const path = require('path');

const { autoUpdater } = require('electron/main');
const { app, BrowserWindow, shell, Menu } = require('electron');

const { dotnugg } = require('@nuggxyz/dotnugg-sdk');

const __DEV__ = process.env.NODE_ENV === 'development';

class Main {
    static _window;

    static get window() {
        return this._window;
    }

    static _watcher;

    static get watcher() {
        return this._watcher;
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
        this._window = null;
    }

    static onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady();
        }
    }

    static onReady() {
        // console.log(__DEV__, process.env.NODE_ENVIRONMENT);

        this._window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preload.js'),
                nodeIntegration: true,
                // contextIsolation: false,
            },
            icon: path.join(__dirname, 'AppIcon/AppIcon.icns'),
            titleBarStyle: 'hiddenInset',
            titleBarOverlay: true,
            // transparent: true,
        });

        console.log(this._window);
        void this._window.loadURL(
            __DEV__
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, '../build/index.html')}`,
        );
        this._window.maximize();
        this._window.on('closed', () => this.onClose());

        if (__DEV__) {
            this._window.webContents.openDevTools();
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

        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('ready', this.onReady);
        app.on('activate', this.onActivate);

        void dotnugg.parser.init('lens/main');
    }
}

module.exports = Main;
