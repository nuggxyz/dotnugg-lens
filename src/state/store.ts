import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import AppState from './app';

export const states = {
    AppState,
};

export const rootReducer = combineReducers({
    app: AppState.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'app/addToastToList',
                    'app/removeToastFromList',
                    'swap/placeOffer/fulfilled',
                    'wallet/claim/fulfilled',
                ],
                ignoredPaths: ['app'],
            },
        }).concat(Object.values(states).flatMap((state) => state.middlewares)),
});

export type NLRootState = ReturnType<typeof rootReducer>;
export type NLDispatch = typeof store.dispatch;

export const useNLDispatch = () => useDispatch<NLDispatch>();
export const NLSelector = (state: NLRootState) => state;

export default store;
