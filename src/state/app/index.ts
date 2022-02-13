import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UAParser from 'ua-parser-js';

import {
    isUndefinedOrNullOrArrayEmpty,
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
    smartInsert,
    smartRemove,
    smartReplace,
} from '../../lib';
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
        });
    }

    protected override _slice = createSlice({
        name: this._name,
        initialState: this._initialState,
        reducers: {
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
                state.toasts = smartInsert(temp, action.payload);
            },
            removeToastFromList: (
                state,
                action: PayloadAction<
                    Partial<NL.Redux.App.Toast> & { index: number }
                >,
            ) => {
                let temp = [...state.toasts];
                state.toasts = smartRemove(temp, action.payload);
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
                state.artLocation = action.payload;
            },
            setCompiledItems: (state, action: PayloadAction<string[]>) => {
                state.compiledItems = action.payload;
            },
            addToAsepriteFiles: (state, action: PayloadAction<string[]>) => {
                state.asepriteFiles = [
                    ...state.asepriteFiles,
                    ...action.payload,
                ];
            },
            setOS: (state, action: PayloadAction<NL.Redux.App.OS>) => {
                state.os = action.payload;
            },
        },
    });

    public static silentlySetRoute(route: string) {
        window.location.hash = route;
    }
}

export default AppState;
