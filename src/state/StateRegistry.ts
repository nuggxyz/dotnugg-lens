import { AnyAction, Middleware, Reducer } from '@reduxjs/toolkit';

export class StateRegistry {
    _emitChange: (_: any) => void;
    _reducers: Dictionary<Reducer<any, AnyAction>>;
    _middlewares: Middleware[] = [];

    constructor() {
        this._emitChange = null;
        this._reducers = {
            temp: (state = null) => state,
        };
    }
    getReducers() {
        return { ...this._reducers };
    }
    register(name: string, reducer: Reducer<any, AnyAction>) {
        this._reducers = { ...this._reducers, [name]: reducer };
        if (this._emitChange) {
            this._emitChange(this.getReducers());
        }
    }
    setChangeListener(listener: any) {
        this._emitChange = listener;
    }

    setMiddlewares(middlewares: Middleware[]) {
        this._middlewares = middlewares;
    }

    getMiddlewares() {
        return this._middlewares;
    }
}
const reducerRegistry = new StateRegistry();
export default reducerRegistry;
