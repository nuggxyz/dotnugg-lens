import React, { FC, PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';

import './prototypes';
import './lib/analytics';
import './index.css';
import './styles/pulse.css';

import App from './pages/App';
import ErrorBoundary from './components/general/ErrorBoundry';
import useClientUpdater from './client/useClientUpdater';

import './client/ipc-listeners';

global.Buffer = global.Buffer || (await import('buffer')).Buffer;

const GlobalHooks = () => {
    useClientUpdater();

    return null;
};

const ContentBlock: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return <>{children}</>;
};

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GlobalHooks />

        <ErrorBoundary>
            <ContentBlock>
                <App />
            </ContentBlock>
        </ErrorBoundary>
    </React.StrictMode>,
);
