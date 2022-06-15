import React, { FunctionComponent } from 'react';

import globalStyles from '@src/lib/globalStyles';
import client from '@src/client';

import Connect from './Connect/Connect';
import Main from './Main/Main';

const App: FunctionComponent<unknown> = () => {
    const apiKey = client.keys.useInfuraKey();

    return (
        <div
            style={{
                ...globalStyles.centered,
                ...globalStyles.fillHeight,
                ...globalStyles.fillWidth,
            }}
        >
            {apiKey ? <Main /> : <Connect />}
        </div>
    );
};

export default App;
