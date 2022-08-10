import * as path from 'path';

const config = {
    entry: {
        server: path.resolve(__dirname, '../../src/server/index.ts'),
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../../build'),
        chunkFilename: '[name].js',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'ts-loader',
            },
        ],
    },
};

export default config;
