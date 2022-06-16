/* eslint-disable @typescript-eslint/unbound-method */
import * as path from 'path';

import { dotnugg } from '@nuggxyz/dotnugg-sdk';
import { autoUpdater } from 'electron/main';
import { app, BrowserWindow, shell, Menu } from 'electron';

import { IpcListener } from './ipc-listener';

const __DEV__ = process.env.NODE_ENV === 'development';

export default class Main {
    public static window: Electron.BrowserWindow;

    public static watcher: dotnugg.watcher;

    public static readonly APP_NAME = 'lens/main';

    public static readonly DEFAULT = 'lensDefault';

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        // this.window = null;
    }

    private static onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady();
        }
    }

    private static onReady() {
        console.log(__DEV__, process.env.NODE_ENVIRONMENT);
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preload.js'),
            },
            icon: path.join(__dirname, 'AppIcon/AppIcon.icns'),
            titleBarStyle: 'hiddenInset',
            titleBarOverlay: true,
            // transparent: true,
        });
        void this.window.loadURL(
            __DEV__
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, '../build/index.html')}`,
        );
        this.window.maximize();
        this.window.on('closed', () => this.onClose());

        if (__DEV__) {
            this.window.webContents.openDevTools();
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

        IpcListener.register(this);
    }
}
