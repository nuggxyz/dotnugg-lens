import * as fs from 'fs';
import * as path from 'path';

import webpack from 'webpack';
import resolve from 'resolve';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import * as WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import ESLintPlugin from 'eslint-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import paths from './paths';
import modules from './modules';
import getClientEnvironment from './env';
import createEnvironmentHash from './persistentCache/createEnvironmentHash';

// const ForkTsCheckerWebpackPlugin =
//     process.env.TSC_COMPILE_ON_ERROR === 'true'
//         ? ForkTsCheckerWarningWebpackPlugin
//         : ForkTsCheckerWebpackPlugin;

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
    '@pmmmwh/react-refresh-webpack-plugin',
);
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve(
    '@babel/runtime/helpers/esm/assertThisInitialized',
    { paths: [babelRuntimeEntry] },
);
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
    paths: [babelRuntimeEntry],
});

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// Check if Tailwind config exists
const useTailwind = fs.existsSync(path.join(paths.appPath, 'tailwind.config.js'));

// Get the path to the uncompiled service worker (if it exists).
const { swSrc } = paths;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false;
    }

    try {
        require.resolve('react/jsx-runtime');
        return true;
    } catch (e) {
        return false;
    }
})();

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default function (webpackEnv: 'production' | 'development'): webpack.Configuration {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    // Variable used for enabling profiling in Production
    // passed into alias object. Uses a flag if passed into the build command
    const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

    const shouldAnalyzeBundle = isEnvProduction && process.argv.includes('--analyze-bundle');

    // We will provide `paths.publicUrlOrPath` to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    // Get environment variables to inject into our app.
    const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

    const shouldUseReactRefresh = env.raw.FAST_REFRESH;

    // common function to get style loaders
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate index.html folder
                // in production `paths.publicUrlOrPath` can be a relative path
                options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                    postcssOptions: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebook/create-react-app/issues/2677
                        ident: 'postcss',
                        config: false,
                        plugins: !useTailwind
                            ? [
                                  'postcss-flexbugs-fixes',
                                  [
                                      'postcss-preset-env',
                                      {
                                          autoprefixer: {
                                              flexbox: 'no-2009',
                                          },
                                          stage: 3,
                                      },
                                  ],
                                  // Adds PostCSS Normalize as the reset css with default options,
                                  // so that it honors browserslist config in package.json
                                  // which in turn let's users customize the target behavior as per their needs.
                                  'postcss-normalize',
                              ]
                            : [
                                  'tailwindcss',
                                  'postcss-flexbugs-fixes',
                                  [
                                      'postcss-preset-env',
                                      {
                                          autoprefixer: {
                                              flexbox: 'no-2009',
                                          },
                                          stage: 3,
                                      },
                                  ],
                              ],
                    },
                    sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                },
            },
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push(
                {
                    loader: require.resolve('resolve-url-loader'),
                    options: {
                        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                        root: paths.appSrc,
                    },
                },
                {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: true,
                    },
                },
            );
        }
        return loaders;
    };

    return {
        stats: { children: true },
        experiments: { topLevelAwait: true },

        target: ['browserslist'],
        mode: isEnvProduction ? 'production' : isEnvDevelopment ? 'development' : 'none',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry: paths.appIndexJs,
        output: {
            globalObject: `(typeof self !== 'undefined' ? self : this)`,
            // The build folder.
            path: paths.appBuild,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            // There will be one main bundle, and one file per asynchronous chunk.
            // In development, it does not produce real files.
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : isEnvDevelopment && 'static/js/bundle.js',
            // There are also additional JS chunk files if you use code splitting.
            chunkFilename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : isEnvDevelopment && 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
            // webpack uses `publicPath` to determine where the app is being served from.
            // It requires a trailing slash, or the file assets will get an incorrect path.
            // We inferred the "public path" (such as / or /my-project) from homepage.
            publicPath: paths.publicUrlOrPath,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: isEnvProduction
                ? (info) =>
                      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
                : isEnvDevelopment &&
                  ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
        },
        cache: {
            type: 'filesystem',
            version: createEnvironmentHash(env.raw),
            cacheDirectory: paths.appWebpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [__filename],
                tsconfig: [paths.appTsConfig, paths.appJsConfig].filter((f) => fs.existsSync(f)),
            },
        },
        infrastructureLogging: {
            level: 'none',
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            minimize: isEnvProduction,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // We want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minification steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 2017,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        keep_classnames: isEnvProductionProfile,
                        keep_fnames: isEnvProductionProfile,
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                }),
                // This is only used in production mode
                new CssMinimizerPlugin(),
            ],
        },
        resolve: {
            fallback: {
                // querystring: false, // require.resolve("querystring-es3")
                // zlib: false, // require.resolve("browserify-zlib")
                // crypto: false, // require.resolve("crypto-browserify")
                // stream: false, // require.resolve("stream-browserify")
                // url: false, // require.resolve("url/")
                path: require.resolve('path-browserify'),
                // http: false, // require.resolve("stream-http")
                vm: require.resolve('vm-browserify'),
                console: require.resolve('console-browserify'),
                constants: require.resolve('constants-browserify'),

                fs: false,
                util: require.resolve('assert/'),
                url: require.resolve('url/'),
                os: require.resolve('os-browserify/browser'),
                https: require.resolve('https-browserify'),
                http: require.resolve('stream-http'),
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify'),
            },
            // This allows you to set a fallback for where webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebook/create-react-app/issues/253
            modules: ['node_modules', paths.appNodeModules].concat(
                modules.additionalModulePaths || [],
            ),
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebook/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: paths.moduleFileExtensions
                .map((ext) => `.${ext}`)
                .filter((ext) => useTypeScript || !ext.includes('ts')),
            alias: {
                // Support React Native Web
                // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
                'react-native': 'react-native-web',
                // Allows for better profiling with ReactDevTools
                ...(isEnvProductionProfile && {
                    'react-dom$': 'react-dom/profiling',
                    'scheduler/tracing': 'scheduler/tracing-profiling',
                }),
                ...(modules.webpackAliases || {}),
            },
            plugins: [
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                // @ts-ignore
                new ModuleScopePlugin(paths.appSrc, [
                    paths.appPackageJson,
                    reactRefreshRuntimeEntry,
                    reactRefreshWebpackPluginRuntimeEntry,
                    babelRuntimeEntry,
                    babelRuntimeEntryHelpers,
                    babelRuntimeRegenerator,
                ]),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    // We're specifying native_modules in the test because the asset relocator loader generates a
                    // "fake" .node file which is really a cjs file.
                    test: /native_modules\/.+\.node$/,
                    use: 'node-loader',
                },
                // Handle node_modules packages that contain sourcemaps
                shouldUseSourceMap && {
                    enforce: 'pre' as string,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
                    use: [
                        {
                            loader: 'source-map-loader',
                            options: {
                                filterSourceMappingUrl: (url, resourcePath) => {
                                    if (
                                        resourcePath.includes('@walletconnect') ||
                                        resourcePath.includes('@metamask') ||
                                        resourcePath.includes('json-rpc-engine') ||
                                        resourcePath.includes('walletlink') ||
                                        resourcePath.includes('@coinbase')
                                    ) {
                                        return 'skip';
                                    }

                                    return true;
                                },
                            },
                        },
                    ],
                },
                // {
                //     // test: /\.worker\.js$/,
                //     // use: {
                //     //     loader: 'worker-loader',
                //     //     options: {
                //     //         inline: true,
                //     //     },
                //     // },
                //     test: /\.worker\.ts$/,
                //     use: [
                //         {
                //             loader: 'worker-loader',
                //             options: {
                //                 // inline: true,
                //                 // Use directory structure & typical names of chunks produces by "react-scripts"
                //                 filename: 'static/js/[name].[contenthash:8].js',
                //                 // esModule: false,
                //             },
                //         },
                //     ],
                // },
                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // TODO: Merge this config once `image/avif` is in the mime-db
                        // https://github.com/jshttp/mime-db
                        {
                            test: [/\.avif$/],
                            type: 'asset',
                            mimetype: 'image/avif',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
                            },
                        },
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            type: 'asset',
                            parser: {
                                dataUrlCondition: {
                                    maxSize: imageInlineSizeLimit,
                                },
                            },
                        },
                        {
                            test: /\.svg$/,
                            use: [
                                {
                                    loader: require.resolve('@svgr/webpack'),
                                    options: {
                                        prettier: false,
                                        svgo: false,
                                        svgoConfig: {
                                            plugins: [{ removeViewBox: false }],
                                        },
                                        titleProp: true,
                                        ref: true,
                                    },
                                },
                                {
                                    loader: require.resolve('file-loader'),
                                    options: {
                                        name: 'static/media/[name].[hash].[ext]',
                                    },
                                },
                            ],
                            issuer: {
                                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                            },
                        },

                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides',
                                ),
                                presets: [
                                    [
                                        require.resolve('babel-preset-react-app'),
                                        {
                                            runtime: hasJsxRuntime ? 'automatic' : 'classic',
                                        },
                                    ],
                                ],

                                plugins: [
                                    isEnvDevelopment &&
                                        shouldUseReactRefresh &&
                                        require.resolve('react-refresh/babel'),

                                    // [
                                    //     'import',
                                    //     {
                                    //         libraryName: 'react-icons/si',
                                    //         // 'react-icons/bs',
                                    //         // 'react-icons/io5',
                                    //         libraryDirectory: 'lib',
                                    //     },
                                    //     'react-icons',
                                    // ],
                                ].filter(Boolean),
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },

                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: true,
                                configFile: false,
                                compact: false,
                                presets: [
                                    [
                                        require.resolve('babel-preset-react-app/dependencies'),
                                        { helpers: true },
                                    ],
                                ],
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,

                                // Babel sourcemaps are needed for debugging into node_modules
                                // code.  Without the options below, debuggers like VSCode
                                // show incorrect code and set breakpoints on the wrong lines.
                                sourceMaps: shouldUseSourceMap,
                                inputSourceMap: shouldUseSourceMap,
                            },
                        },

                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        // By default we support CSS Modules with the extension .module.css
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction
                                        ? shouldUseSourceMap
                                        : isEnvDevelopment,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                                undefined,
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                        // using the extension .module.css
                        {
                            test: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction
                                        ? shouldUseSourceMap
                                        : isEnvDevelopment,
                                    modules: {
                                        mode: 'local',
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                undefined,
                            ),
                        },
                        // Opt-in support for SASS (using .scss or .sass extensions).
                        // By default we support SASS Modules with the
                        // extensions .module.scss or .module.sass
                        {
                            test: sassRegex,
                            exclude: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 3,
                                    sourceMap: isEnvProduction
                                        ? shouldUseSourceMap
                                        : isEnvDevelopment,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                                'sass-loader',
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },
                        // Adds support for CSS Modules, but using SASS
                        // using the extension .module.scss or .module.sass
                        {
                            test: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 3,
                                    sourceMap: isEnvProduction
                                        ? shouldUseSourceMap
                                        : isEnvDevelopment,
                                    modules: {
                                        mode: 'local',
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                'sass-loader',
                            ),
                        },

                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise be processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            type: 'asset/resource',
                        },
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ],
                },
            ].filter(Boolean) as webpack.RuleSetRule[],
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise-promise',
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml,
                ...(isEnvProduction
                    ? {
                          minify: {
                              removeComments: true,
                              collapseWhitespace: true,
                              removeRedundantAttributes: true,
                              useShortDoctype: true,
                              removeEmptyAttributes: true,
                              removeStyleLinkTypeAttributes: true,
                              keepClosingSlash: true,
                              minifyJS: true,
                              minifyCSS: true,
                              minifyURLs: true,
                          },
                      }
                    : undefined),
            }),
            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            // https://github.com/facebook/create-react-app/issues/5358
            isEnvProduction &&
                shouldInlineRuntimeChunk &&
                new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // It will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            new InterpolateHtmlPlugin(
                HtmlWebpackPlugin,
                // this was just env.raw - modified it to convert all types to string
                Object.entries(env.raw).reduce((prev, curr) => {
                    return { ...prev, [curr[0]]: String(curr[1]) };
                }, {}) as { [key: string]: string },
            ),
            // This gives some necessary context to module not found errors, such as
            // the requesting resource.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            new ModuleNotFoundPlugin(paths.appPath),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Otherwise React will be compiled in the very slow development mode.
            new webpack.DefinePlugin(env.stringified),
            // Experimental hot reloading for React .
            // https://github.com/facebook/react/tree/main/packages/react-refresh
            isEnvDevelopment &&
                shouldUseReactRefresh &&
                new ReactRefreshWebpackPlugin({
                    overlay: false,
                }),
            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                }),
            // Generate an asset manifest file with the following content:
            // - "files" key: Mapping of all asset filenames to their corresponding
            //   output file so that tools can pick it up without having to parse
            //   `index.html`
            // - "entrypoints" key: Array of files which are included in `index.html`,
            //   can be used to reconstruct the HTML if necessary
            new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicUrlOrPath,
                useEntryKeys: true,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);
                    const entrypointFiles = entrypoints.main.filter(
                        (fileName) => !fileName.endsWith('.map'),
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    } as { [key: string]: unknown };
                },
            }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            // Generate a service worker script that will precache, and keep up to date,
            // the HTML & assets that are part of the webpack build.
            isEnvProduction &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                fs.existsSync(swSrc) &&
                new WorkboxWebpackPlugin.InjectManifest({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    swSrc,
                    dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
                    exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
                    // Bump up the default maximum size (2mb) that's precached,
                    // to make lazy-loading failure scenarios less likely.
                    // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
                    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                }),

            // TypeScript type checking
            useTypeScript &&
                new ForkTsCheckerWebpackPlugin({
                    async: isEnvDevelopment,
                    typescript: {
                        typescriptPath: resolve.sync('typescript', {
                            basedir: paths.appNodeModules,
                        }),
                        configOverwrite: {
                            compilerOptions: {
                                sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                                skipLibCheck: true,
                                inlineSourceMap: false,
                                declarationMap: false,
                                noEmit: true,
                                incremental: true,
                                tsBuildInfoFile: paths.appTsBuildInfoFile,
                            },
                        },
                        context: paths.appPath,
                        diagnosticOptions: {
                            syntactic: true,
                        },
                        mode: 'write-references',
                        // profile: true,
                    },
                    issue: {
                        // This one is specifically to match during CI tests,
                        // as micromatch doesn't match
                        // '../cra-template-typescript/template/src/App.tsx'
                        // otherwise.
                        include: [
                            { file: '../**/src/**/*.{ts,tsx}' },
                            { file: '**/src/**/*.{ts,tsx}' },
                        ],
                        exclude: [
                            { file: '**/src/**/__tests__/**' },
                            { file: '**/src/**/?(*.){spec|test}.*' },
                            { file: '**/src/setupProxy.*' },
                            { file: '**/src/setupTests.*' },
                        ],
                    },
                    // logger: {
                    //     // infrastructure: 'silent',

                    // },
                }),
            !disableESLintPlugin &&
                new ESLintPlugin({
                    // Plugin options
                    extensions: ['ts', 'tsx'],
                    formatter: require.resolve('react-dev-utils/eslintFormatter'),
                    eslintPath: require.resolve('eslint'),
                    failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
                    context: paths.appSrc,
                    cache: true,
                    // cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
                    // cacheStrategy: 'content',
                    // ESLint class options
                    cwd: paths.appPath,
                    resolvePluginsRelativeTo: __dirname,
                    baseConfig: {
                        extends: [path.resolve(paths.appPath, '.eslintrc')],
                        rules: {
                            ...(!hasJsxRuntime && {
                                'react/react-in-jsx-scope': 'error',
                            }),
                        },
                    },
                }),
            // https://www.useanvil.com/blog/engineering/minimizing-webpack-bundle-size/
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            shouldAnalyzeBundle && new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        ].filter(Boolean),
        // Turn off performance processing because we utilize
        // our own hints via the FileSizeReporter
        performance: { hints: 'warning' },
    };
}
