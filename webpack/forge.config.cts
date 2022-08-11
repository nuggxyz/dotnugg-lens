import type { ForgeConfig } from '@electron-forge/shared-types';
import type { MakerPKGConfig } from '@electron-forge/maker-pkg';
import type { MakerSquirrelConfig } from '@electron-forge/maker-squirrel';
import type { PublisherGitHubConfig } from '@electron-forge/publisher-github';
import type { MakerZIPConfig } from '@electron-forge/maker-zip';
import type { OsxSignOptions, OsxNotarizeOptions } from 'electron-packager';

import getClientEnvironment from './env';

// https://github.com/Microsoft/TypeScript/issues/12936#issuecomment-1061725873
type Exact<T, I = unknown> = T extends I
    ? Exclude<keyof T, keyof I> extends never
        ? T
        : never
    : never;
function exact<T, I = unknown>(obj: T): Exact<T, I> {
    return obj as unknown as Exact<T, I>;
}

const env = getClientEnvironment('').raw as unknown as {
    NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string;
};

if (!env.NUGG_APP_APPLE_ID_PASSWORD || !env.NUGG_APP_APPLE_ID_EMAIL) {
    throw Error('NUGG_APP_APPLE_ID_PASSWORD and NUGG_APP_APPLE_ID_EMAIL are required');
}

const BUNDLE_ID = 'prod';

const APP_BUNDLE_ID = `com.nuggxyz.dotnugg.lens.v1`;

const APPLE_DEV_ID = 'Apple Distribution: Dark Horse Labs LLC (S2XCG88739)';

const APPLE_TEAM_ID = 'S2XCG88739';

const forgeConfig: ForgeConfig = {
    buildIdentifier: BUNDLE_ID,
    packagerConfig: {
        appBundleId: APP_BUNDLE_ID,
        osxSign: exact<OsxSignOptions>({
            identity: APPLE_DEV_ID,
            hardenedRuntime: true,
            entitlements: './macos/entitlements.plist',
            'entitlements-inherit': './macos/entitlements.plist',
        }),
        osxNotarize: exact<OsxNotarizeOptions>({
            appleId: env.NUGG_APP_APPLE_ID_EMAIL,
            appleIdPassword: env.NUGG_APP_APPLE_ID_PASSWORD,
            ascProvider: APPLE_TEAM_ID,
            // teamId: 'S2XCG88739',
            // tool: 'notarytool',
        }),
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
            platforms: ['linux'],
        },
        {
            name: '@electron-forge/maker-pkg',
            enabled: true,
            platforms: ['darwin'],
            config: exact<MakerPKGConfig>({
                install: '/Applications',
            }),
        },
        // {
        //     name: '@electron-forge/maker-dmg',
        //     enabled: true,
        //     platforms: ['darwin'],
        //     config: exact<MakerDMGConfig>({
        //         overwrite: true,
        //         name: 'dotnugg-lens',
        //         format: 'UDCO',
        //         icon: './macos/AppIcon/icon.icns',
        //         debug: true,
        //         additionalDMGOptions: {
        //             'background-color': '#ffffff',
        //             window: {
        //                 size: {
        //                     width: 690,
        //                     height: 590,
        //                 },
        //             },
        //         },
        //     }),
        // },
        {
            name: '@electron-forge/maker-appx',
            enabled: false,
            platforms: ['win32'],
            config: {
                publisher: 'CN=developmentca',
                devCert: 'C:\\devcert.pfx',
                certPass: 'abcd',
            },
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
        triggerHook: undefined,
        triggerMutatingHook: undefined,
        overrideStartLogic: undefined,
    },
    plugins: [
        [
            '@electron-forge/plugin-electronegativity',
            {
                isSarif: true,
            },
        ],
        // ['@electron-forge/plugin-auto-unpack-natives', {}],
    ],
    hooks: {},
};

export = forgeConfig;
