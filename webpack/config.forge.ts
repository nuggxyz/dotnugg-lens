import { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDMGConfig } from '@electron-forge/maker-dmg';
import { MakerPKGConfig } from '@electron-forge/maker-pkg';
import { MakerSquirrelConfig } from '@electron-forge/maker-squirrel';
import { PublisherGitHubConfig } from '@electron-forge/publisher-github';
import { MakerZIPConfig } from '@electron-forge/maker-zip';

const BUNDLE_ID = 'prod';

const APP_BUNDLE_ID = `com.nuggxyz.dotnugg.lens.${BUNDLE_ID}`;

// https://github.com/Microsoft/TypeScript/issues/12936#issuecomment-1061725873
type Exact<T, I = unknown> = T extends I
    ? Exclude<keyof T, keyof I> extends never
        ? T
        : never
    : never;
function exact<T, I = unknown>(obj: T): Exact<T, I> {
    return obj as unknown as Exact<T, I>;
}

const config: ForgeConfig = {
    buildIdentifier: BUNDLE_ID,
    packagerConfig: {
        appBundleId: APP_BUNDLE_ID,
    },
    electronRebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['linux'],
            config: exact<MakerZIPConfig>({}),
            enabled: true,
        },

        {
            name: '@electron-forge/maker-squirrel',
            config: exact<MakerSquirrelConfig>({
                certificateFile: './cert.pfx',
                certificatePassword: 'this-is-a-secret',
            }),
            enabled: true,
            platforms: ['mas'],
        },
        {
            name: '@electron-forge/maker-pkg',
            enabled: true,
            platforms: ['mas'],
            config: exact<MakerPKGConfig>({
                install: '/Applications',
                keychain: 'my-secret-ci-keychain',
            }),
        },
        {
            name: '@electron-forge/maker-dmg',
            enabled: true,
            platforms: ['mas'],
            config: exact<MakerDMGConfig>({
                overwrite: true,
                name: 'dotnugg-lens',
                format: 'UDCO',
            }),
        },
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: exact<PublisherGitHubConfig>({
                repository: {
                    owner: 'nuggxyz',
                    name: '@nuggxyz/dotnugg-lens',
                },
                prerelease: true,
            }),
        },
    ],
    pluginInterface: {
        triggerHook: () => Promise.resolve(undefined),
        triggerMutatingHook: () => Promise.resolve(undefined),
        overrideStartLogic: () => Promise.resolve(false),
    },
    plugins: [
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: './webpack/server/webpack.config.ts',
                renderer: {
                    config: './webpack/app/webpack.config.ts',
                    entryPoints: [
                        {
                            name: 'main_window',
                            html: './build/public/index.html',
                            js: './build/index.js',
                        },
                    ],
                },
            },
        ],
    ],
    hooks: {},
};

export default config;
