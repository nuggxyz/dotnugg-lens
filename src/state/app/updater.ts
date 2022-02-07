import { useEffect } from 'react';

import {
    isUndefinedOrNullOrStringEmpty,
    loadStringFromLocalStorage,
} from '../../lib';

import AppState from '.';

export default () => {
    const artLocation = AppState.select.artLocation();
    const resizer = () => {
        AppState.dispatch.setWindowDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        if (!isUndefinedOrNullOrStringEmpty(artLocation)) {
            window.dotnugg.createCompiler(artLocation);
        }
    }, [artLocation]);

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
