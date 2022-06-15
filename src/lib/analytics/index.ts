import ReactGA from 'react-ga4';

import { isMobile } from '@src/lib/userAgent';

export const GOOGLE_ANALYTICS_CLIENT_ID_STORAGE_KEY = 'ga_client_id';
const GOOGLE_ANALYTICS_ID: string | undefined = process.env.NUGG_APP_GOOGLE_ANALYTICS_ID;

const storedClientId = window.localStorage.getItem(GOOGLE_ANALYTICS_CLIENT_ID_STORAGE_KEY);

if (typeof GOOGLE_ANALYTICS_ID === 'string') {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
        gaOptions: {
            storage: 'none',
            storeGac: false,
            clientId: storedClientId ?? undefined,
            siteSpeedSampleRate: 100,
        },
    });
    ReactGA.set({
        anonymizeIp: true,
        customBrowserType: !isMobile
            ? 'desktop'
            : 'web3' in window || 'ethereum' in window
            ? 'mobileWeb3'
            : 'mobileRegular',
    });
} else {
    ReactGA.initialize('test', { gtagOptions: { debug_mode: true } });
}
