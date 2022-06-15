"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var fs = __importStar(require("fs"));
var child_process_1 = require("child_process");
var ethers_1 = require("ethers");
var utils_1 = __importDefault(require("./utils"));
var IpcListener = /** @class */ (function () {
    function IpcListener() {
    }
    var _a;
    _a = IpcListener;
    IpcListener.register = function (main) {
        _a.main = main;
        _a.main.ipcMain.on('select-files', _a.onSelectFiles);
        _a.main.ipcMain.on('open-to', _a.onOpenTo);
        _a.main.ipcMain.on('open-to-vscode', _a.onOpenToVsCode);
        _a.main.ipcMain.on('check-os', _a.onCheckOs);
        _a.main.ipcMain.on('get-hex', _a.onGetHex);
        _a.main.ipcMain.on('fetch-compiler-items', _a.onFetchCompilerItems);
        _a.main.ipcMain.on('clear-cache', _a.onClearCache);
        _a.main.ipcMain.on('get-lens-default', _a.onGetLensDefault);
        _a.main.ipcMain.on('list-layers', _a.onListLayers);
    };
    IpcListener.onSelectFiles = function (event) {
        if (os.platform() === 'linux' || os.platform() === 'win32') {
            _a.main.dialog
                .showOpenDialog({
                properties: ['openDirectory']
            })
                .then(function (_b) {
                var filePaths = _b.filePaths;
                if (filePaths) {
                    event.reply('file-selected', filePaths[0]);
                    fs.readdir(filePaths[0], function (err, list) {
                        if (err)
                            throw err;
                        for (var i = 0; i < list.length; i++) {
                            if (path.extname(list[i]) === 'collection.nugg') {
                                console.log(list[i]);
                                return;
                            }
                        }
                        (0, child_process_1.exec)("cat \"".concat(__DEV__
                            ? "lentsDefault".concat(utils_1["default"].pathDelimiter(), "collection.nugg")
                            : path.join(__dirname, "..".concat(utils_1["default"].pathDelimiter(), "lensDefault").concat(utils_1["default"].pathDelimiter(), "collection.nugg")), "\" >> \"").concat(filePaths[0]).concat(utils_1["default"].pathDelimiter(), "collection.nugg\""));
                    });
                }
                else {
                    event.reply('file-error');
                }
            });
        }
        else {
            _a.main.dialog
                .showOpenDialog({
                properties: ['openDirectory']
            })
                .then(function (_b) {
                var filePaths = _b.filePaths;
                if (filePaths) {
                    event.reply('file-selected', filePaths[0]);
                    fs.readdir(filePaths[0], function (err, list) {
                        if (err)
                            throw err;
                        for (var i = 0; i < list.length; i++) {
                            if (path.extname(list[i]) === 'collection.nugg') {
                                console.log(list[i]);
                                return;
                            }
                        }
                        (0, child_process_1.exec)("cat \"".concat(__DEV__
                            ? "lentsDefault".concat(utils_1["default"].pathDelimiter(), "collection.nugg")
                            : path.join(__dirname, "..".concat(utils_1["default"].pathDelimiter(), "lensDefault").concat(utils_1["default"].pathDelimiter(), "collection.nugg")), "\" >> \"").concat(filePaths[0]).concat(utils_1["default"].pathDelimiter(), "collection.nugg\""));
                    });
                }
                else {
                    event.reply('file-error');
                }
            });
        }
    };
    IpcListener.onOpenTo = function (event, path, application) {
        if (application) {
            (0, child_process_1.exec)("open -a \"".concat(application, "\" ").concat(path.replaceAll(' ', '\\ ')));
        }
        else {
            _a.main.shell.openPath(path);
        }
    };
    IpcListener.onOpenToVsCode = function (event, path) {
        if (os.platform() === 'win32') {
            (0, child_process_1.exec)("code ".concat(path));
        }
        else {
            (0, child_process_1.exec)("open -a \"Visual Studio Code\" ".concat(path.replaceAll(' ', '\\ ')));
        }
    };
    IpcListener.onCheckOs = function (event) {
        event.returnValue = os.platform();
    };
    IpcListener.onGetHex = function (event, item, path) {
        try {
            event.returnValue = _a.main.watcher.builder.hexArray(item);
        }
        catch (e) {
            event.returnValue = e;
        }
    };
    IpcListener.onFetchCompilerItems = function (event, path, address, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
        var infura, e_1;
        var _this = _a;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    infura = new ethers_1.ethers.providers.InfuraProvider('rinkeby', apiKey);
                    this.main.watcher = this.main.dotnugg.watcher.watch(this.main.APP_NAME, path, address, infura, function (fileUri) {
                        console.log('###################### FILE ', fileUri);
                        _this.main.window.webContents.send('main-loading');
                    }, function (fileUri, me) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log('######## DONE COMPILING ##########', fileUri);
                                    return [4 /*yield*/, me.renderer.wait()];
                                case 1:
                                    _b.sent();
                                    this.formatAndSend(me.builder, me.renderer);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 
                    // @ts-ignore
                    function (error) {
                        _this.main.window.webContents.send('compiler-error', error);
                    });
                    return [4 /*yield*/, this.main.watcher.renderer.wait()];
                case 1:
                    _b.sent();
                    this.formatAndSend(this.main.watcher.builder, this.main.watcher.renderer);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    event.reply('compiler-error', "Compilation error: ".concat(e_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    IpcListener.onConvertAseprite = function (event, sourcePath, destPath, layer) {
        if (layer === void 0) { layer = '_'; }
        return __awaiter(void 0, void 0, void 0, function () {
            var _this = _a;
            return __generator(_a, function (_b) {
                this.safeExecAseprite(function () {
                    try {
                        if (!sourcePath.endsWith('.aseprite')) {
                            throw new Error('Selected file is not an aseprite file');
                        }
                        if (!fs.existsSync("".concat(destPath))) {
                            throw new Error('Incorrect Art Repo');
                        }
                        var filenames = sourcePath
                            .split('.')[0]
                            .split(utils_1["default"].pathDelimiter());
                        var dir_1 = "generated_".concat(filenames[filenames.length - 1]);
                        var base = "".concat(destPath).concat(utils_1["default"].pathDelimiter()).concat(dir_1);
                        var count = fs
                            .readdirSync(destPath, { withFileTypes: true })
                            .filter(function (entry) {
                            return entry.isDirectory() && entry.name.includes(dir_1);
                        }).length;
                        (0, child_process_1.exec)("mkdir \"".concat(base, "_").concat(count + 1, "\""));
                        (0, child_process_1.exec)("".concat(utils_1["default"].asepritePath(), " -b --script-param source=\"").concat(sourcePath, "\" --script-param dest=\"").concat(base, "_").concat(count + 1, "\" --script-param layer=\"").concat(layer, "\" --script \"").concat(__DEV__
                            ? ".".concat(utils_1["default"].pathDelimiter(), "aseprite2dotnugg.lua")
                            : path.join(__dirname, "..".concat(utils_1["default"].pathDelimiter(), "aseprite2dotnugg.lua")), "\""), function (error) {
                            if (error !== null) {
                                throw new Error(error);
                            }
                            // this.main.shell.openPath(destPath + '/generated');
                            _this.main.window.webContents.send('script-success', sourcePath, layer);
                        });
                    }
                    catch (e) {
                        _this.main.window.webContents.send('script-error', e, sourcePath);
                    }
                }, sourcePath);
                return [2 /*return*/];
            });
        });
    };
    IpcListener.onOpenLink = function (event, url) {
        _a.main.shell.openExternal(url);
    };
    IpcListener.onClearCache = function (event, _path) {
        var command = os.platform() === 'win32' ? 'rmdir /s /q' : 'rm -rf';
        (0, child_process_1.exec)("".concat(command, " ").concat(path.join(_path, '.dotnugg-cache')));
    };
    IpcListener.onListLayers = function (event, path) {
        _a.safeExecAseprite(function () {
            try {
                (0, child_process_1.exec)("".concat(utils_1["default"].asepritePath(), " -b --all-layers --list-layers \"").concat(path, "\""), function (error, stdout, stderr) {
                    if (error !== null) {
                        throw new Error(error);
                    }
                    _a.main.window.webContents.send('layers', path, stdout);
                });
            }
            catch (e) {
                _a.main.window.webContents.send('script-error', e);
            }
        }, path);
    };
    IpcListener.onGetLensDefault = function (event) {
        event.returnValue = path.join(__dirname, __DEV__ ? '' : "..".concat(utils_1["default"].pathDelimiter()), _a.main.DEFAULT);
    };
    IpcListener.safeExecAseprite = function (callback, path) {
        var command = os.platform() === 'win32'
            ? "if exist ".concat(utils_1["default"].asepritePath(), " echo TRUE")
            : "test -f ".concat(utils_1["default"].asepritePath(), " && echo TRUE");
        return (0, child_process_1.exec)(command, function (error, stdout) {
            if (stdout === 'TRUE\n' || stdout === 'TRUE\r\n') {
                callback();
            }
            else {
                _a.main.window.webContents.send('script-error', "Please make sure you have downloaded the *paid version* of Aseprite to ".concat(utils_1["default"].asepritePath(), ", ").concat(stdout, ", ").concat(stdout === 'TRUE', " ").concat(stdout === 'TRUE\n'), path);
            }
            return stdout;
        });
    };
    IpcListener.formatAndSend = function (builder, renderer) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(_a, function (_b) {
            res = Object.entries(builder.outputByItemIndex).map(function (_b) {
                var key = _b[0], value = _b[1];
                return {
                    title: key,
                    items: Object.values(value).map(function (item) {
                        return __assign(__assign({}, builder.output[item]), { svg: renderer.results[builder.output[item].fileUri]
                                .data });
                    })
                };
            });
            if (res) {
                this.main.window.webContents.send('items-fetched', res);
            }
            else {
                this.main.window.webContents.send('compiler-error', 'Error: unknown error while compiling files');
            }
            return [2 /*return*/];
        });
    }); };
    return IpcListener;
}());
exports["default"] = IpcListener;
