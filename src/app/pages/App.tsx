import React, { FunctionComponent } from 'react';

import globalStyles from '@src/app/lib/globalStyles';
import Modal from '@src/app/components/modal/GlobalModal';
import client from '@src/app/client';

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
