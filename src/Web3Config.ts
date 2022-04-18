import store from './state/store';

export default class Web3Config {
    static CHAIN = 4;
    static DOTNUGG_V1 = '0x328489d531da7e632073b5850a6932e57e8f2698';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://rinkeby.infura.io/v3/${
                key ? key : store.getState().app.apiKey
            }`,
        };
    }
}
