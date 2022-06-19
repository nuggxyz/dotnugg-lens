/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { exec } from 'child_process';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain, dialog, shell } from 'electron';
import { ethers } from 'ethers';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';

// eslint-disable-next-line module-resolver/use-alias
import type { Item } from '../src/client/compiled';
import { dotnugg } from '../../dotnugg-sdk';

import utils from './utils';
import Main from './main';

const __DEV__ = process.env.NODE_ENV === 'development';

export class IpcListener {
    static register = () => {
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
                })
                .catch((err) => {
                    console.log('ERROR: ', err);
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
            event.returnValue = Main.watcher.builder.hexArray(item);
        } catch (e) {
            event.returnValue = e as string;
        }
    };

    public static onFetchCompilerItems = async (
        event: Electron.IpcMainEvent,
        filePath: string,
        address: string,
        apiKey: string,
    ) => {
        try {
            console.log(filePath, address, apiKey);
            const infura = new ethers.providers.InfuraProvider('goerli', apiKey);

            console.log('SUP', Main.window);

            Main._watcher = dotnugg.watcher.watch(
                Main.APP_NAME,
                filePath,
                address,
                infura,
                (fileUri) => {
                    console.log('###################### FILE ', fileUri);
                    event.sender.send('main-loading');
                },

                async (fileUri, me) => {
                    console.log('######## DONE COMPILING ##########', fileUri);

                    await me.renderer.wait();

                    this.formatAndSend(event);
                },

                (error) => {
                    event.sender.send('compiler-error', error);
                },
            );

            await Main.watcher.renderer.wait();

            this.formatAndSend(event);
        } catch (e: unknown) {
            event.reply('compiler-error', `Compilation error: ${e as string}`);
        }
    };

    public static onConvertAseprite = (
        event: Electron.IpcMainEvent,
        sourcePath: string,
        destPath: string,
        layer = '_',
    ) => {
        void this.safeExecAseprite(
            () => {
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
                                : path.join(
                                      __dirname,
                                      `..${utils.pathDelimiter()}aseprite2dotnugg.lua`,
                                  )
                        }"`,
                        (error) => {
                            if (error !== null) {
                                throw new Error(error as unknown as string);
                            }
                            // shell.openPath(destPath + '/generated');
                            event.sender.send('script-success', sourcePath, layer);
                        },
                    );
                } catch (e) {
                    event.sender.send('script-error', e, sourcePath);
                }
            },
            sourcePath,
            event,
        );
    };

    public static onOpenLink = (event: Electron.IpcMainEvent, url: string) => {
        void shell.openExternal(url);
    };

    public static onClearCache = (event: Electron.IpcMainEvent, filePath: string) => {
        const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        exec(`${command} ${path.join(filePath, '.dotnugg-cache')}`);
    };

    public static onListLayers = (event: Electron.IpcMainEvent, filePath: string) => {
        this.safeExecAseprite(
            () => {
                try {
                    exec(
                        `${utils.asepritePath()} -b --all-layers --list-layers "${filePath}"`,
                        (error, stdout) => {
                            if (error !== null) {
                                throw new Error(error as unknown as string);
                            }
                            event.sender.send('layers', filePath, stdout);
                        },
                    );
                } catch (e) {
                    event.sender.send('script-error', e);
                }
            },
            filePath,
            event,
        );
    };

    public static onGetLensDefault = (event: Electron.IpcMainEvent) => {
        event.returnValue = path.join(
            __dirname,
            __DEV__ ? '' : `..${utils.pathDelimiter()}`,
            Main.DEFAULT,
        );
    };

    private static safeExecAseprite = (
        callback: () => void,
        filePath: string,
        event: Electron.IpcMainEvent,
    ) => {
        const command =
            os.platform() === 'win32'
                ? `if exist ${utils.asepritePath()} echo TRUE`
                : `test -f ${utils.asepritePath()} && echo TRUE`;
        return exec(command, (error, stdout) => {
            if (stdout === 'TRUE\n' || stdout === 'TRUE\r\n') {
                callback();
            } else {
                event.sender.send(
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

    private static formatAndSend = (event: Electron.IpcMainEvent) => {
        // @ts-ignore
        const res: Item[] = Main.watcher.builder.output.map((item) => {
            return {
                ...item,
                svg: Main.watcher.renderer.results[item.fileUri].data,
            };
        });
        if (res) {
            event.sender.send('items-fetched', res, Main.watcher.parsedDocument);
        } else {
            event.sender.send('compiler-error', 'Error: unknown error while compiling files');
        }
    };
}
