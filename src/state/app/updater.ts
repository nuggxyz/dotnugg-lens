import { useEffect } from 'react';

import {
    isUndefinedOrNullOrStringEmpty,
    loadStringFromLocalStorage,
} from '../../lib';
import Web3Config from '../../Web3Config';

import AppState from '.';

export default () => {
    const artLocation = AppState.select.artLocation();
    const apiKey = AppState.select.apiKey();
    const resizer = () => {
        AppState.dispatch.setWindowDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        if (
            !isUndefinedOrNullOrStringEmpty(artLocation) &&
            !isUndefinedOrNullOrStringEmpty(apiKey)
        ) {
            AppState.dispatch.setMainProcessLoading(true);
            window.dotnugg.createCompiler(
                artLocation,
                Web3Config.DOTNUGG_V1,
                apiKey,
            );
        }
    }, [artLocation, apiKey]);

    useEffect(() => {
        resizer();
        window.addEventListener('resize', resizer);

        AppState.dispatch.setApiKey({ _localStorageTarget: 'apiKey' });

        AppState.dispatch.setArtLocation({
            _localStorageTarget: 'artLocation',
        });

        return () => {
            window.removeEventListener('resize', resizer);
        };
    }, []);

    return null;
};
