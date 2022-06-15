"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotnugg_sdk_1 = require("@nuggxyz/dotnugg-sdk");
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var main_1 = __importDefault(require("./main"));
main_1["default"].main(electron_1.app, electron_1.ipcMain, 
// @ts-ignore
electron_updater_1.autoUpdater, electron_1.shell, electron_1.dialog, electron_1.BrowserWindow, electron_1.Menu, dotnugg_sdk_1.dotnugg);
