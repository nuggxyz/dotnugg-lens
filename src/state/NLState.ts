import { createSelector } from 'reselect';
import { AnyAction, isPending, SliceCaseReducers } from '@reduxjs/toolkit';
import { Slice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { isUndefinedOrNullOrObjectEmpty } from './../lib/index';
import store, { NLSelector } from './store';

/* eslint-disable react-hooks/rules-of-hooks */

export class NLState<S> {
    protected static _instance: NLState<any>;

    private static _selectors: {};
    private static _dispatches: {};

    private _thactions: NL.Redux.Thactions;
    private _middlewares: NL.Redux.Middlewares;

    protected _hooks: {};

    protected _name: string;
    protected _initialState: S;
    protected _updater: NL.Redux.Updater;
    protected _slice: Slice<S, SliceCaseReducers<S>, string>;

    protected _isOwnFulfilledAction: (
        action: AnyAction,
        suffix: string,
    ) => boolean;

    protected constructor(
        name: string,
        updater: NL.Redux.Updater,
        middlewares: NL.Redux.Middlewares,
        thactions: NL.Redux.Thactions,
        hooks: Dictionary<NL.Redux.Hook>,
        initialState: S,
    ) {
        if (new.target === NLState) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
        this._middlewares = middlewares;
        this._thactions = thactions;
        this._name = name;
        this._hooks = hooks;
        this._initialState = initialState;
        this._updater = updater;

        this._isOwnFulfilledAction = (
            action: AnyAction,
            suffix: string,
        ): action is AnyAction =>
            !NLState.isPendingAction(this._name)(action) &&
            // !NLState.isRejectedAction(this._name)(action) &&
            NLState.hasPrefix(action, this._name) &&
            NLState.hasSuffix(action, suffix);
    }

    static get instance() {
        if (this._instance === undefined)
            throw new Error('Should not reach here');
        return this._instance;
    }

    public static get nombre() {
        return this.instance._name;
    }

    public static get reducer() {
        return this.instance._slice.reducer;
    }

    public static get middlewares() {
        return Object.values(this.instance._middlewares);
    }

    public static get updater() {
        return this.instance._updater;
    }

    protected static get actions() {
        return this.instance._slice.actions;
    }

    protected static get thactions() {
        return this.instance._thactions;
    }

    protected static get hook() {
        return this.instance._hooks;
    }

    public static get select() {
        if (isUndefinedOrNullOrObjectEmpty(this._selectors)) {
            this._selectors = Object.keys(this.instance._initialState).reduce(
                (selectors, key) => {
                    selectors[key] = (
                        eqFn?: (prev: any, cur: any) => boolean,
                    ) =>
                        useSelector(
                            createSelector(
                                NLSelector,
                                (s) => s[this.instance._name][key],
                            ),
                            eqFn,
                        );
                    return selectors;
                },
                {},
            );
        }
        return this._selectors;
    }

    public static get dispatch() {
        if (isUndefinedOrNullOrObjectEmpty(this._dispatches)) {
            this._dispatches = [
                ...Object.entries(this.actions),
                ...Object.entries(this.thactions),
            ].reduce((dispatches, [name, action]) => {
                dispatches[name] = (value?: any) =>
                    store.dispatch(action(value) as any);
                return dispatches;
            }, {});
        }
        return this._dispatches;
    }

    public static get isOwnFulfilledAction() {
        return this.instance._isOwnFulfilledAction;
    }

    public static hasPrefix = (action: AnyAction, prefix: string) =>
        action.type.startsWith(prefix);

    public static hasSuffix = (action: AnyAction, suffix: string) =>
        action.type.includes(suffix);

    public static isPending = (action: AnyAction) =>
        action.type.endsWith('/pending');

    public static isFulfilled = (action: AnyAction) =>
        action.type.endsWith('/fulfilled');

    public static isRejected = (action: AnyAction) =>
        action.type.endsWith('/rejected');

    public static isPendingAction =
        (prefix: string) =>
        (action: AnyAction): action is AnyAction => {
            return this.hasPrefix(action, prefix) && isPending(action);
        };

    public static isRejectedAction =
        (prefix: string) =>
        (action: AnyAction): action is AnyAction => {
            return this.hasPrefix(action, prefix) && this.isRejected(action);
        };

    public static isFulfilledAction =
        (prefix: string) =>
        (action: AnyAction): action is AnyAction => {
            return this.hasPrefix(action, prefix) && this.isFulfilled(action);
        };
}
