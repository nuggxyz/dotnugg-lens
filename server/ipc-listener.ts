/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { exec } from 'child_process';

import { ipcMain, dialog, shell } from 'electron';
import { ethers } from 'ethers';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';
import { dotnugg } from '@nuggxyz/dotnugg-sdk';

import utils from './utils';
import type Main from './main';

const __DEV__ = process.env.NODE_ENV === 'development';

export class IpcListener {
    public static main: typeof Main;

    static register = (main: typeof Main) => {
        this.main = main;
        ipcMain.on('select-files', this.onSelectFiles);
        ipcMain.on('open-to', this.onOpenTo);
        ipcMain.on('open-to-vscode', this.onOpenToVsCode);
        ipcMain.on('check-os', this.onCheckOs);
        ipcMain.on('get-hex', this.onGetHex);
        ipcMain.on('fetch-compiler-items', this.onFetchCompilerItems);
        ipcMain.on('clear-cache', this.onClearCache);
        ipcMain.on('get-lens-default', this.onGetLensDefault);
        ipcMain.on('list-layers', this.onListLayers);
    };

    public static onSelectFiles = (event: Electron.IpcMainEvent) => {
        if (os.platform() === 'linux' || os.platform() === 'win32') {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.reply('file-selected', filePaths[0]);
                        fs.readdir(filePaths[0], (err, list) => {
                            if (err) throw err;
                            for (let i = 0; i < list.length; i++) {
                                if (path.extname(list[i]) === 'collection.nugg') {
                                    console.log(list[i]);
                                    return;
                                }
                            }
                            exec(
                                `cat "${
                                    __DEV__
                                        ? `lentsDefault${utils.pathDelimiter()}collection.nugg`
                                        : path.join(
                                              __dirname,
                                              `..${utils.pathDelimiter()}lensDefault${utils.pathDelimiter()}collection.nugg`,
                                          )
                                }" >> "${filePaths[0]}${utils.pathDelimiter()}collection.nugg"`,
                            );
                        });
                    } else {
                        event.reply('file-error');
                    }
                });
        } else {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.reply('file-selected', filePaths[0]);
                        fs.readdir(filePaths[0], (err, list) => {
                            if (err) throw err;
                            for (let i = 0; i < list.length; i++) {
                                if (path.extname(list[i]) === 'collection.nugg') {
                                    console.log(list[i]);
                                    return;
                                }
                            }
                            exec(
                                `cat "${
                                    __DEV__
                                        ? `lentsDefault${utils.pathDelimiter()}collection.nugg`
                                        : path.join(
                                              __dirname,
                                              `..${utils.pathDelimiter()}lensDefault${utils.pathDelimiter()}collection.nugg`,
                                          )
                                }" >> "${filePaths[0]}${utils.pathDelimiter()}collection.nugg"`,
                            );
                        });
                    } else {
                        event.reply('file-error');
                    }
                });
        }
    };

    public static onOpenTo = (
        event: Electron.IpcMainEvent,
        filePath: string,
        application: string,
    ) => {
        if (application) {
            exec(`open -a "${application}" ${filePath.replaceAll(' ', '\\ ')}`);
        } else {
            void shell.openPath(filePath);
        }
    };

    public static onOpenToVsCode = (event: Electron.IpcMainEvent, filePath: string) => {
        if (os.platform() === 'win32') {
            exec(`code ${filePath}`);
        } else {
            exec(`open -a "Visual Studio Code" ${filePath.replaceAll(' ', '\\ ')}`);
        }
    };

    public static onCheckOs = (event: Electron.IpcMainEvent) => {
        event.returnValue = os.platform();
    };

    public static onGetHex = (event: Electron.IpcMainEvent, item: Output) => {
        try {
            event.returnValue = this.main.watcher.builder.hexArray(item);
        } catch (e) {
            event.returnValue = e;
        }
    };

    public static onFetchCompilerItems = async (
        event: Electron.IpcMainEvent,
        filePath: string,
        address: string,
        apiKey: string,
    ) => {
        try {
            const infura = new ethers.providers.InfuraProvider('rinkeby', apiKey);

            this.main.watcher = dotnugg.watcher.watch(
                this.main.APP_NAME,
                filePath,
                address,
                infura,
                (fileUri) => {
                    console.log('###################### FILE ', fileUri);
                    this.main.window.webContents.send('main-loading');
                },
                // @ts-ignore

                async (fileUri, me) => {
                    console.log('######## DONE COMPILING ##########', fileUri);
                    // @ts-ignore
                    // eslint-disable-next-line
                    await me.renderer.wait();
                    // @ts-ignore
                    // eslint-disable-next-line
                    this.formatAndSend(me.builder, me.renderer);
                },

                // @ts-ignore
                (error) => {
                    this.main.window.webContents.send('compiler-error', error);
                },
            );

            await this.main.watcher.renderer.wait();

            this.formatAndSend(this.main.watcher.builder, this.main.watcher.renderer);
        } catch (e) {
            event.reply('compiler-error', `Compilation error: ${e as string}`);
        }
    };

    public static onConvertAseprite = (
        event: Electron.IpcMainEvent,
        sourcePath: string,
        destPath: string,
        layer = '_',
    ) => {
        void this.safeExecAseprite(() => {
            try {
                if (!sourcePath.endsWith('.aseprite')) {
                    throw new Error('Selected file is not an aseprite file');
                }
                if (!fs.existsSync(`${destPath}`)) {
                    throw new Error('Incorrect Art Repo');
                }
                const filenames = sourcePath.split('.')[0].split(utils.pathDelimiter());
                const dir = `generated_${filenames[filenames.length - 1]}`;
                const base = `${destPath}${utils.pathDelimiter()}${dir}`;
                const count = fs
                    .readdirSync(destPath, { withFileTypes: true })
                    .filter((entry) => entry.isDirectory() && entry.name.includes(dir)).length;
                exec(`mkdir "${base}_${count + 1}"`);

                exec(
                    `${utils.asepritePath()} -b --script-param source="${sourcePath}" --script-param dest="${base}_${
                        count + 1
                    }" --script-param layer="${layer}" --script "${
                        __DEV__
                            ? `.${utils.pathDelimiter()}aseprite2dotnugg.lua`
                            : path.join(__dirname, `..${utils.pathDelimiter()}aseprite2dotnugg.lua`)
                    }"`,
                    (error) => {
                        if (error !== null) {
                            throw new Error(error as unknown as string);
                        }
                        // shell.openPath(destPath + '/generated');
                        this.main.window.webContents.send('script-success', sourcePath, layer);
                    },
                );
            } catch (e) {
                this.main.window.webContents.send('script-error', e, sourcePath);
            }
        }, sourcePath);
    };

    public static onOpenLink = (event: Electron.IpcMainEvent, url: string) => {
        void shell.openExternal(url);
    };

    public static onClearCache = (event: Electron.IpcMainEvent, filePath: string) => {
        const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        exec(`${command} ${path.join(filePath, '.dotnugg-cache')}`);
    };

    public static onListLayers = (event: Electron.IpcMainEvent, filePath: string) => {
        this.safeExecAseprite(() => {
            try {
                exec(
                    `${utils.asepritePath()} -b --all-layers --list-layers "${filePath}"`,
                    (error, stdout) => {
                        if (error !== null) {
                            throw new Error(error as unknown as string);
                        }
                        this.main.window.webContents.send('layers', filePath, stdout);
                    },
                );
            } catch (e) {
                this.main.window.webContents.send('script-error', e);
            }
        }, filePath);
    };

    public static onGetLensDefault = (event: Electron.IpcMainEvent) => {
        event.returnValue = path.join(
            __dirname,
            __DEV__ ? '' : `..${utils.pathDelimiter()}`,
            this.main.DEFAULT,
        );
    };

    private static safeExecAseprite = (callback: () => void, filePath: string) => {
        const command =
            os.platform() === 'win32'
                ? `if exist ${utils.asepritePath()} echo TRUE`
                : `test -f ${utils.asepritePath()} && echo TRUE`;
        return exec(command, (error, stdout) => {
            if (stdout === 'TRUE\n' || stdout === 'TRUE\r\n') {
                callback();
            } else {
                this.main.window.webContents.send(
                    'script-error',
                    `Please make sure you have downloaded the *paid version* of Aseprite to ${utils.asepritePath()}, ${stdout}, ${
                        stdout === 'TRUE' ? 'true' : 'false'
                        /// @danny7even what is the logic supposed to be here?
                    } ${stdout === 'TRUE\n' ? 'true' : 'false'}`,
                    filePath,
                );
            }
            return stdout;
        });
    };

    private static formatAndSend = (builder: dotnugg.builder, renderer: dotnugg.renderer) => {
        const res = Object.entries(builder.outputByItemIndex).map(([key, value]) => {
            return {
                title: key,
                items: Object.values(value).map((item) => {
                    return {
                        ...builder.output[item],
                        svg: renderer.results[builder.output[item].fileUri].data,
                    };
                }),
            };
        });
        if (res) {
            this.main.window.webContents.send('items-fetched', res);
        } else {
            this.main.window.webContents.send(
                'compiler-error',
                'Error: unknown error while compiling files',
            );
        }
    };
}
