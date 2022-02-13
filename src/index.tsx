import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './prototypes';
global.Buffer = global.Buffer || require('buffer').Buffer;

import store from './state/store';
import './index.css';
import Initializer from './state/Initializer';
import Modal from './components/general/Modals/Modal/Modal';
import App from './pages/App';
import ToastContainer from './components/general/Toast/ToastContainer';
import './state/ipcListeners';

ReactDOM.render(
    <React.Fragment>
        <div id="dragBar" />
        <React.StrictMode>
            <Provider store={store}>
                <Initializer>
                    <ToastContainer />
                    <Modal />
                    <App />
                </Initializer>
            </Provider>
        </React.StrictMode>
    </React.Fragment>,
    document.getElementById('root'),
);
