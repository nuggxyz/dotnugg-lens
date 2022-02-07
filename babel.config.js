module.exports = function (api) {
    api.cache(true);
    return {
        plugins: [
            [
                '@babel/plugin-transform-typescript',
                {
                    allowDeclareFields: true,
                },
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
        presets: [
            [
                '@babel/preset-typescript',
                {
                    allowDeclareFields: true,
                },
            ],
            ['@babel/preset-env'],
            ['@babel/preset-react'],
        ],
    };
};
