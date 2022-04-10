import store from './state/store';

export default class Web3Config {
    static CHAIN = 4;
    static DOTNUGG_V1 = '0x4fd859c35f5bd594a4c9ac3bccb6cbf9badef02c';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://rinkeby.infura.io/v3/${
                key ? key : store.getState().app.apiKey
            }`,
        };
    }
}
