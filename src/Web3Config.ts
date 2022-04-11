import store from './state/store';

export default class Web3Config {
    static CHAIN = 4;
    static DOTNUGG_V1 = '0x5dc1a0e59729c0c29b2b659e452a34e2b4f987f1';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://rinkeby.infura.io/v3/${
                key ? key : store.getState().app.apiKey
            }`,
        };
    }
}
