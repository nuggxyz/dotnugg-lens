// if (__DEV__) {

// } else {
//     require('./build/server/index.js');
// }
// // require('./server/index.ts');

// eslint-ignore
// require('ts-node').register({
//     project: './server/tsconfig.json',
//     files: ['./server'],
//     options: {
//         experimentalReplAwait: true,
//         experimentalResolver: true,
//         transpileOnly: true,
//         ignoreDiagnostics: [2339],
//     },
// }); // This will register the TypeScript compiler
// require('./server/index.ts');

globalThis.__DEV__ = process.env.NODE_ENV === 'development';

console.log('AYOOOOOOOO', __DEV__);

require('./serverjs/index.js');
