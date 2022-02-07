import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

import './prototypes';
global.Buffer = global.Buffer || require('buffer').Buffer;

import store from './state/store';
import './index.css';
import { getProvider, NetworkContextName } from './config';
import Initializer from './state/Initializer';
import Modal from './components/general/Modals/Modal/Modal';
import Main from './pages/Main';
import ToastContainer from './components/general/Toast/ToastContainer';
import './state/ipcListeners';

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

ReactDOM.render(
    <div style={{ width: '100%', height: '100%' }}>
        <React.StrictMode>
            <Provider store={store}>
                {/* <Web3ReactProvider getLibrary={getProvider}>
                    <Web3ProviderNetwork getLibrary={getProvider}> */}
                        <Initializer>
                            <ToastContainer />
                            <Modal />
                            <Main />
                        </Initializer>
                    {/* </Web3ProviderNetwork>
                </Web3ReactProvider> */}
            </Provider>
        </React.StrictMode>
    </div>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

// events: {
//     "Approval(address,address,uint256)": EventFragment;
//     "ApprovalForAll(address,address,bool)": EventFragment;
//     "Burn(uint160,address,uint96)": EventFragment;
//     "Claim(uint160,address)": EventFragment;
//     "ClaimItem(uint176,uint160)": EventFragment;
//     "Offer(uint160,address,uint96)": EventFragment; // tokenid, user, new current value
//     "OfferItem(uint176,uint160,uint96)": EventFragment; // tokenId + itemId, 'user',
//     "DotnuggV1ConfigUpdated(uint256)": EventFragment;
//     "Genesis(uint256,uint32,uint24)": EventFragment;
//     "Liquidate(uint160,uint96,address)": EventFragment;
//     "Loan(uint160,uint96)": EventFragment;
//     "MigrateV1Sent(address,uint160,uint256,address,uint96)": EventFragment;
//     "MigratorV1Updated(address)": EventFragment;
//     "Mint(uint160,uint96)": EventFragment;
//     "ProtocolEthExtracted(uint96)": EventFragment;
//     "Rebalance(uint160,uint96)": EventFragment;
//     "Stake(uint256)": EventFragment; // 96 protocol 96 stakedEth 64 (rest) stakedShares
//     "Swap(uint160,uint96)": EventFragment;
//     "SwapItem(uint176,uint96)": EventFragment;
//     "Transfer(address,address,uint256)": EventFragment;
//     "TrustUpdated(address,bool)": EventFragment;
//     "UserTrustUpdated(address,bool)": EventFragment;
//   };
