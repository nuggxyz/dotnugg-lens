import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UAParser from 'ua-parser-js';

import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
    smartInsertIndex,
    smartRemove,
    smartReplace,
} from '../../lib';
import constants from '../../lib/constants';
import Layout from '../../lib/layout';
import { NLState } from '../NLState';
import store from '../store';

import hooks from './hooks';
import middlewares from './middlewares';
import thactions from './thactions';
import updater from './updater';

const STATE_NAME = 'app';

class AppState extends NLState<NL.Redux.App.State> {
    declare static _instance: AppState;

    declare static actions: typeof this.instance._slice.actions;
    declare static reducer: typeof this.instance._slice.reducer;
    declare static select: ApplyFuncToChildren<
        typeof this.instance._initialState
    >;
    declare static dispatch: ApplyDispatchToChildren<
        typeof thactions & typeof this.instance._slice.actions
    >;

    static get instance() {
        if (this._instance === undefined) this._instance = new this();
        return this._instance;
    }

    constructor() {
        super(STATE_NAME, updater, middlewares, thactions, hooks, {
            os: 'darwin',
            dimensions: {
                height: 0,
                width: 0,
            },
            toasts: [],
            modalIsOpen: undefined,
            modalData: {},
            apiKey: '',
            asepriteFiles: [],
            artLocation: '',
            compiledItems: [],
            mainProcessLoading: false,
            isZoomOn: false,
        });
    }

    protected override _slice = createSlice({
        name: this._name,
        initialState: this._initialState,
        reducers: {
            setIsZoomOn: (state, action: PayloadAction<boolean>) => {
                state.isZoomOn = action.payload;
            },
            setMainProcessLoading: (state, action: PayloadAction<boolean>) => {
                state.mainProcessLoading = action.payload;
            },
            setWindowDimensions: (
                state,
                action: PayloadAction<{ height: number; width: number }>,
            ) => {
                state.dimensions = action.payload;
            },
            addToastToList: (
                state,
                action: PayloadAction<NL.Redux.App.Toast>,
            ) => {
                let temp = state.toasts;
                state.toasts = smartInsertIndex(temp, action.payload);
            },
            removeToastFromList: (
                state,
                action: PayloadAction<
                    Partial<NL.Redux.App.Toast> & { index: number }
                >,
            ) => {
                state.toasts = smartRemove(state.toasts, action.payload);
            },
            replaceToast: (
                state,
                action: PayloadAction<
                    Partial<NL.Redux.App.Toast> & { id: string }
                >,
            ) => {
                let temp = state.toasts;
                state.toasts = smartReplace(temp, action.payload);
            },
            setModalOpen: (
                state,
                action: PayloadAction<{
                    name: NL.Redux.App.Modals;
                    modalData?: NL.Redux.App.ModalsData;
                }>,
            ) => {
                state.modalIsOpen = action.payload.name;
                state.modalData = !isUndefinedOrNullOrObjectEmpty(
                    action.payload.modalData,
                )
                    ? action.payload.modalData
                    : {};
            },
            setModalClosed: (state) => {
                state.modalIsOpen = undefined;
                state.modalData = {};
            },
            setApiKey: (state, action: PayloadAction<string>) => {
                state.apiKey = action.payload;
            },
            setArtLocation: (state, action: PayloadAction<string>) => {
                state.artLocation = !isUndefinedOrNullOrStringEmpty(
                    action.payload,
                )
                    ? action.payload
                    : window.dotnugg.getLensDefault();
            },
            setCompiledItems: (state, action: PayloadAction<any[]>) => {
                state.compiledItems = action.payload;
            },
            addToAsepriteFiles: (
                state,
                action: PayloadAction<NL.Redux.App.AsepriteFile[]>,
            ) => {
                if (!isUndefinedOrNullOrArrayEmpty(action.payload)) {
                    let temp = [...state.asepriteFiles];
                    action.payload.forEach((item) => {
                        temp = temp.smartInsert(item, 'path');
                    });
                    state.asepriteFiles = temp;
                }
            },
            updateAsepriteFiles: (
                state,
                action: PayloadAction<Partial<NL.Redux.App.AsepriteFile>>,
            ) => {
                let file = { ...action.payload };

                if ('options' in action.payload) {
                    const options = { ...(file as any).options };
                    delete (action.payload as any).options;

                    if ('layers' in options) {
                        let found = state.asepriteFiles.find(
                            (_file) => file.path === _file.path,
                        );
                        file = {
                            ...file,
                            layers: found.layers.map((layer) => {
                                return {
                                    ...layer,
                                    ...options.layers,
                                };
                            }),
                        };
                    }
                }
                state.asepriteFiles = [
                    ...(state.asepriteFiles.replace(
                        file,
                        'path',
                    ) as NL.Redux.App.AsepriteFile[]),
                ];
            },
            updateAsepriteLayer: (
                state,
                action: PayloadAction<{
                    layer: NL.Redux.App.AsepriteFile;
                    file: string;
                }>,
            ) => {
                let file = state.asepriteFiles.find(
                    (file) => file.path === action.payload.file,
                );
                file = {
                    ...file,
                    layers: file.layers.replace(action.payload.layer, 'path'),
                };

                state.asepriteFiles = [
                    ...(state.asepriteFiles.replace(
                        file,
                        'path',
                    ) as NL.Redux.App.AsepriteFile[]),
                ];
            },
            setOS: (state, action: PayloadAction<NL.Redux.App.OS>) => {
                state.os = action.payload;
            },
        },
    });
}

export default AppState;
