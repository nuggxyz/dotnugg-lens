import React, { FunctionComponent } from 'react';

import globalStyles from '@src/lib/globalStyles';
import client from '@src/client';
import Modal from '@src/components/modal/GlobalModal';

import Connect from './Connect/Connect';
import Main from './Main/Main';

const App: FunctionComponent<unknown> = () => {
    const apiKey = client.compiled.useInfuraKey();

    return (
        <div
            style={{
                ...globalStyles.centered,
                ...globalStyles.fillHeight,
                ...globalStyles.fillWidth,
            }}
        >
            {apiKey ? <Main /> : <Connect />}
            <Modal />
        </div>
    );
};

export default App;
