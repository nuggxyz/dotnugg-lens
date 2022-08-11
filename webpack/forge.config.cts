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

if (!env.NUGG_APP_WINDOWS_PFX_FILE || !env.NUGG_APP_WINDOWS_PFX_PASSWORD) {
    throw Error('NUGG_APP_WINDOWS_PFX_FILE and NUGG_APP_WINDOWS_PFX_PASSWORD are required');
}

const BUNDLE_ID = 'prod';

const APP_BUNDLE_ID = `com.nuggxyz.dotnugg.lens.v1`;

const APPLE_DEV_ID_APP_CERT_IDENTITY = 'Developer ID Application: Dark Horse Labs LLC (S2XCG88739)';

// const APPLE_TEAM_ID = 'S2XCG88739';

const forgeConfig: ForgeConfig = {
    buildIdentifier: BUNDLE_ID,
    packagerConfig: {
        asar: true,
        overwrite: true,
        name: 'Dotnugg Lens',
        appBundleId: APP_BUNDLE_ID,
        appCopyright: 'Copyright © 2022 Dark Horse Labs LLC',
        darwinDarkModeSupport: true,
        appCategoryType: 'public.app-category.creativity',
        icon: './macos/AppIcon/AppIcon.icns',
        osxSign: exact<OsxSignOptions>({
            hardenedRuntime: true,
            entitlements: './macos/entitlements.plist',
            'entitlements-inherit': './macos/entitlements.plist',
            // 'gatekeeper-assess': false,
            identity: APPLE_DEV_ID_APP_CERT_IDENTITY,
        }),
        osxNotarize: exact<OsxNotarizeOptions>({
            appleId: env.NUGG_APP_APPLE_ID_EMAIL,
            appleIdPassword: env.NUGG_APP_APPLE_ID_PASSWORD,
            // ascProvider: APPLE_TEAM_ID,
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
                certificateFile: env.NUGG_APP_WINDOWS_PFX_FILE,
                certificatePassword: env.NUGG_APP_WINDOWS_PFX_PASSWORD,
            }),
            enabled: true,
            platforms: ['linux'],
        },
        {
            name: '@electron-forge/maker-pkg',
            enabled: true,
            platforms: ['darwin', 'mas'],
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
