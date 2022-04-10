import store from './state/store';

export default class Web3Config {
    static CHAIN = 4;
    static DOTNUGG_V1 = '0x7492cfad3e9bd1d46d92159b0b42a8a40303d13d';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://rinkeby.infura.io/v3/${
                key ? key : store.getState().app.apiKey
            }`,
        };
    }
}
