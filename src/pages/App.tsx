import React, { FunctionComponent } from 'react';

import { isUndefinedOrNullOrStringEmpty } from '../lib';
import globalStyles from '../lib/globalStyles';
import AppState from '../state/app';

import Connect from './Connect/Connect';
import Main from './Main/Main';

type Props = {};

const App: FunctionComponent<Props> = () => {
    const apiKey = AppState.select.apiKey();

    React.useEffect(() => {
        AppState.dispatch.setOS(window.dotnugg.checkOs());
    }, []);

    return (
        <div
            style={{
                ...globalStyles.centerFlex,
                ...globalStyles.fillHeight,
                ...globalStyles.fillWidth,
            }}>
            {!isUndefinedOrNullOrStringEmpty(apiKey) ? <Main /> : <Connect />}
        </div>
    );
};

export default App;
