import store from './state/store';

export default class Web3Config {
    static CHAIN = 5;
    static DOTNUGG_V1 = '0xcbfE2DF1355628Ff7525ae69C31DC708A1b03D40';
    static INFURA_KEY = 'a1625b39cf0047febd415f9b37d8c931';

    static getUrls(key?: string) {
        return {
            [Web3Config.CHAIN]: `https://goerli.infura.io/v3/${
                key ? key : store.getState().app.apiKey
            }`,
        };
    }
}
