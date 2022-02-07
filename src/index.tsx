import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './prototypes';
global.Buffer = global.Buffer || require('buffer').Buffer;

import store from './state/store';
import './index.css';
import Initializer from './state/Initializer';
import Modal from './components/general/Modals/Modal/Modal';
import Main from './pages/Main';
import ToastContainer from './components/general/Toast/ToastContainer';
import './state/ipcListeners';

ReactDOM.render(
    <div style={{ width: '100%', height: '100%' }}>
        <div id="dragBar" />
        <React.StrictMode>
            <Provider store={store}>
                <Initializer>
                    <ToastContainer />
                    <Modal />
                    <Main />
                </Initializer>
            </Provider>
        </React.StrictMode>
    </div>,
    document.getElementById('root'),
);
