/* eslint-disable @typescript-eslint/unbound-method */
import * as path from 'path';

import { autoUpdater } from 'electron/main';
// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, shell, Menu } from 'electron';
import { dotnugg } from '@nuggxyz/dotnugg-sdk';

const __DEV__ = process.env.NODE_ENV === 'development';

export default class Main {
    private static _window: Electron.BrowserWindow;

    public static get window() {
        return this._window;
    }

    public static _watcher: dotnugg.watcher;

    public static get watcher() {
        return this._watcher;
    }

    public static readonly APP_NAME = 'lens/main';

    public static readonly DEFAULT = 'lensDefault';

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private static onClose() {
        // Dereference the _window object.
        // @ts-ignore
        this._window = null;
    }

    private static onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady();
        }
    }

    private static onReady() {
        // console.log(__DEV__, process.env.NODE_ENVIRONMENT);

        this._window = new BrowserWindow({
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
