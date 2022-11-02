/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/unbound-method */
import * as path from 'path';

import { app, BrowserWindow, shell, Menu, autoUpdater } from 'electron';
import { dotnugg } from '@nuggxyz/dotnugg-sdk';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ChildProcess, exec } from 'child_process';

const __DEV__ = process.env.NODE_ENV === 'development';

const RunAnvil = () => {
    const hi = exec(
        `anvil --init ./genesis.json --silent --gas-limit 0 --port 8585 --fork-url "https://eth-goerli.g.alchemy.com/v2/0kFgtjruNi-_3q2wWzjCgN1L1l3M3WN-"`,
    );

    // hi.stdout?.on('data', (data) => {
    //     console.log(data);
    // });

    if (hi) {
        console.log('Anvil started', hi?.connected);

        hi?.stdout?.on('data', (data) => {
            console.log('anvil-output', data);
        });

        hi?.stderr?.on('data', (data) => {
            console.log('anvil-output', data);
        });

        hi?.on('close', (code) => {
            console.log('anvil-close', code);
        });

        hi?.on('error', (err) => {
            console.log('anvil-error', err);
        });

        return hi;
    }

    return undefined;
};

export default class Main {
    constructor() {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for

        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('ready', this.onReady);
        app.on('activate', this.onActivate);

        void dotnugg.parser.init('lens/main');
    }

    public _window: Electron.BrowserWindow | undefined;

    public get window() {
        return this._window;
    }

    public _watcher: dotnugg.watcher | undefined;

    public get watcher() {
        return this._watcher;
    }

    public readonly APP_NAME = 'lens/main';

    public readonly DEFAULT = 'lensDefault';

    public onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    public proc: ChildProcess | undefined;

    public onClose() {
        // Dereference the _window object.
        // @ts-ignore
        // this._window = null;
        if (this.proc) {
            void this.proc?.kill();
        }
    }

    public onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady();
        }
    }

    public onReady() {
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

        this._window.webContents.openDevTools();

        this.proc = RunAnvil();

        void this._window.loadURL(
            __DEV__ ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`,
        );
        this._window.maximize();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this._window.on('closed', function () {
            self.onClose();
        });

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
}

export const __MAIN = new Main();
