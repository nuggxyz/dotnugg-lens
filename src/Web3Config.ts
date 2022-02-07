import store from './state/store';

export default class Web3Config {
    static CHAIN = 5;
    static DOTNUGG_V1 = '0xa3490501fdd354f3b121d7b8b639508bfaf2a869';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://goerli.infura.io/v3/${
                store.getState().app.apiKey === 'dotnugg' || key === 'dotnugg'
                    ? Web3Config.INFURA_KEY
                    : key
                    ? key
                    : store.getState().app.apiKey
            }`,
        };
    }
}
