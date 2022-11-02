/* eslint-disable @typescript-eslint/no-misused-promises */
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { exec } from 'child_process';

import { ipcMain, dialog, shell } from 'electron';
import { Output } from '@nuggxyz/dotnugg-sdk/dist/builder/types/BuilderTypes';
import { dotnugg } from '@nuggxyz/dotnugg-sdk';

import utils from './utils';
import { __MAIN } from './main';

const __DEV__ = process.env.NODE_ENV === 'development';

export class IpcListener {
    register = () => {
        ipcMain.on('select-files', this.onSelectFiles);
        ipcMain.on('open-to', this.onOpenTo);
        ipcMain.on('open-to-vscode', this.onOpenToVsCode);
        ipcMain.on('check-os', this.onCheckOs);
        ipcMain.on('get-hex', this.onGetHex);
        ipcMain.on('fetch-compiler-items', this.onFetchCompilerItems);
        ipcMain.on('clear-cache', this.onClearCache);
        ipcMain.on('get-lens-default', this.onGetLensDefault);
        ipcMain.on('list-layers', this.onListLayers);
        ipcMain.on('convert-aseprite', this.onConvertAseprite);
    };

    public onSelectFiles = (event: Electron.IpcMainEvent) => {
        if (os.platform() === 'linux' || os.platform() === 'win32') {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.sender.send('file-selected', filePaths[0]);
                    } else {
                        event.sender.send('file-error');
                    }
                });
        } else {
            void dialog
                .showOpenDialog({
                    properties: ['openDirectory'],
                })
                .then(({ filePaths }) => {
                    if (filePaths) {
                        event.sender.send('file-selected', filePaths[0]);
                    } else {
                        event.sender.send('file-error');
                    }
                })
                .catch((err) => {
                    if (err instanceof Error) {
                        console.log('ERROR: ', err);
                        event.sender.send('files-error', err.message);
                    } else {
                        event.sender.send('files-error', err);
                    }
                });
        }
    };

    public onOpenTo = (event: Electron.IpcMainEvent, filePath: string, application: string) => {
        if (application) {
            exec(`open -a "${application}" ${filePath.replaceAll(' ', '\\ ')}`);
        } else {
            void shell.openPath(filePath);
        }
    };

    public onOpenToVsCode = (event: Electron.IpcMainEvent, filePath: string) => {
        if (os.platform() === 'win32') {
            exec(`code ${filePath}`);
        } else {
            exec(`open -a "Visual Studio Code" ${filePath.replaceAll(' ', '\\ ')}`);
        }
    };

    public onCheckOs = (event: Electron.IpcMainEvent) => {
        event.returnValue = os.platform();
    };

    public onGetHex = (event: Electron.IpcMainEvent, item: Output) => {
        try {
            event.returnValue = __MAIN.watcher?.builder.hexArray(item);
        } catch (e) {
            event.returnValue = e as string;
        }
    };

    public onFetchCompilerItems = (event: Electron.IpcMainEvent, filePath: string) => {
        try {
            __MAIN._watcher = dotnugg.watcher.watchNoRender(
                __MAIN.APP_NAME,
                filePath,

                (fileUri) => {
                    console.log('###################### FILE ', fileUri);
                    event.sender.send('main-loading');
                },

                (fileUri: string) => {
                    console.log('######## DONE COMPILING ##########', fileUri);

                    this.formatAndSend(event);
                },
            );

            this.formatAndSend(event);
        } catch (e: unknown) {
            event.sender.send('compiler-error', `Compilation error: ${e as string}`);
        }
    };

    public onConvertAseprite = (
        event: Electron.IpcMainEvent,
        sourcePath: string,
        destPath: string,
        id: string,

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
                    const dir = `${filenames[filenames.length - 1]}.aseprite`;
                    const base = `${destPath}${utils.pathDelimiter()}.generated${utils.pathDelimiter()}${dir}`;

                    const name = `${base}${utils.pathDelimiter()}${id}`;
                    console.log('name: ', name, 'layer: ', layer);
                    exec(`mkdir -p "${name}"`);

                    exec(
                        `${utils.asepritePath()} -b --script-param source="${sourcePath}" --script-param dest="${name}" --script-param layer="${layer}" --script "${
                            __DEV__
                                ? `.${utils.pathDelimiter()}aseprite2dotnugg.lua`
                                : path.join(
                                      __dirname,
                                      `..${utils.pathDelimiter()}aseprite2dotnugg.lua`,
                                  )
                        }"`,
                        (error, stdout, stderr) => {
                            if (error) {
                                console.error(
                                    '[onConvertAseprite] exec (aseprite) error: ',
                                    // error,
                                    JSON.stringify({ stdout, stderr }),
                                );
                                // if (error instanceof Error) {
                                //     throw new Error(error.message);
                                // }
                                throw new Error(JSON.stringify({ stdout, stderr }));
                            }

                            exec(
                                `echo ".generated/*" >> ${destPath}${utils.pathDelimiter()}.gitignore`,
                            );
                            if (layer === '_')
                                exec(
                                    `open -a "Visual Studio Code" ${name.replaceAll(
                                        ' ',
                                        '\\ ',
                                    )}/instructions.txt`,
                                );

                            exec(`echo "instructions" > ${name}/instructions.txt`);

                            // shell.openPath(destPath + '/generated');
                            event.sender.send('script-success', sourcePath, layer);
                        },
                    );
                } catch (e) {
                    console.error('ERROR IN onConvertAseprite: ', e);
                    event.sender.send('script-error', e, sourcePath);
                }
            },
            sourcePath,
            event,
        );
    };

    public onOpenLink = (event: Electron.IpcMainEvent, url: string) => {
        void shell.openExternal(url);
    };

    public onClearCache = (event: Electron.IpcMainEvent, filePath: string) => {
        const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        exec(`${command} ${path.join(filePath, '.dotnugg-cache')}`);
    };

    public onListLayers = (event: Electron.IpcMainEvent, filePath: string) => {
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

    public onGetLensDefault = (event: Electron.IpcMainEvent) => {
        event.returnValue = path.join(
            __dirname,
            __DEV__ ? '' : `..${utils.pathDelimiter()}`,
            __MAIN.DEFAULT,
        );
    };

    public safeExecAseprite = (
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

    public formatAndSend = (event: Electron.IpcMainEvent) => {
        if (__MAIN?.watcher?.builder.output) {
            event.sender.send(
                'items-fetched',
                __MAIN?.watcher.builder.output,
                __MAIN?.watcher.parsedDocument,
            );
        } else {
            event.sender.send('compiler-error', 'Error: unknown error while compiling files');
        }
    };
}
