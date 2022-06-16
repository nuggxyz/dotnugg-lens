// eslint-ignore
require('ts-node').register({
    project: './server/tsconfig.json',
    files: ['./server'],
    options: {
        experimentalReplAwait: true,
        experimentalResolver: true,
    },
}); // This will register the TypeScript compiler

globalThis.__DEV__ = process.env.NODE_ENV === 'development';

require('./server/index.ts');
