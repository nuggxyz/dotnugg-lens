const path = require('path');
const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain, dialog, shell } = require('electron');
const { ethers } = require('ethers');
// eslint-disable-next-line module-resolver/use-alias
const { dotnugg } = require('@nuggxyz/dotnugg-sdk');

const Main = require('./main');
const utils = require('./utils');

const __DEV__ = process.env.NODE_ENV === 'development';

class IpcListener {
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

    static onSelectFiles = (event) => {
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

    static onOpenTo = (event, filePath, application) => {
        if (application) {
            exec(`open -a "${application}" ${filePath.replaceAll(' ', '\\ ')}`);
        } else {
            void shell.openPath(filePath);
        }
    };

    static onOpenToVsCode = (event, filePath) => {
        if (os.platform() === 'win32') {
            exec(`code ${filePath}`);
        } else {
            exec(`open -a "Visual Studio Code" ${filePath.replaceAll(' ', '\\ ')}`);
        }
    };

    static onCheckOs = (event) => {
        event.returnValue = os.platform();
    };

    static onGetHex = (event, item) => {
        try {
            event.returnValue = Main.watcher.builder.hexArray(item);
        } catch (e) {
            event.returnValue = e;
        }
    };

    static onFetchCompilerItems = async (event, filePath, address, apiKey) => {
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
        } catch (e) {
            event.reply('compiler-error', `Compilation error: ${e}`);
        }
    };

    static onConvertAseprite = (event, sourcePath, destPath, layer = '_') => {
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
                                throw new Error(error);
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

    static onOpenLink = (event, url) => {
        void shell.openExternal(url);
    };

    static onClearCache = (event, filePath) => {
        const command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        exec(`${command} ${path.join(filePath, '.dotnugg-cache')}`);
    };

    static onListLayers = (event, filePath) => {
        this.safeExecAseprite(
            () => {
                try {
                    exec(
                        `${utils.asepritePath()} -b --all-layers --list-layers "${filePath}"`,
                        (error, stdout) => {
                            if (error !== null) {
                                throw new Error(error);
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

    static onGetLensDefault = (event) => {
        event.returnValue = path.join(
            __dirname,
            __DEV__ ? '' : `..${utils.pathDelimiter()}`,
            Main.DEFAULT,
        );
    };

    static safeExecAseprite = (callback, filePath, event) => {
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

    static formatAndSend = (event) => {
        // @ts-ignore
        const res = Main.watcher.builder.output.map((item) => {
            return {
                ...item,
                svg: Main.watcher.renderer.results[item.fileUri].data,
            };
        });
        console.log(res, Main.window);
        if (res) {
            event.sender.send('items-fetched', res, Main.watcher.parsedDocument);
        } else {
            event.sender.send('compiler-error', 'Error: unknown error while compiling files');
        }
    };
}

module.exports = IpcListener;
