/* eslint-disable prefer-regex-literals */
import type { ForgeConfig } from '@electron-forge/shared-types';
import type { PublisherGitHubConfig } from '@electron-forge/publisher-github';
import type { OsxSignOptions, OsxNotarizeOptions } from 'electron-packager';
import type { MakerDMGConfig } from '@electron-forge/maker-dmg';
import type { MakerPKGConfig } from '@electron-forge/maker-pkg';
import type { MakerSquirrelConfig } from '@electron-forge/maker-squirrel';
import type { MakerZIPConfig } from '@electron-forge/maker-zip';

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

// if (!env.NUGG_APP_WINDOWS_PFX_FILE || !env.NUGG_APP_WINDOWS_PFX_PASSWORD) {
//     throw Error('NUGG_APP_WINDOWS_PFX_FILE and NUGG_APP_WINDOWS_PFX_PASSWORD are required');
// }

// const BUNDLE_ID = 'main';

const forgeConfig: ForgeConfig = {
    buildIdentifier: 'main',

    packagerConfig: {
        dir: '.',
        junk: true,
        // tmpdir: './.tmp',
        prune: true,
        ignore: [
            new RegExp('^(/apps$)'),
            new RegExp('^(/dist$)'),
            new RegExp('^(/libs$)'),
            new RegExp('^(/out$)'),
            new RegExp('^(/out-tsc$)'),
            new RegExp('^(/scripts$)'),
            new RegExp('^(/styles$)'),
            new RegExp('^(/themes$)'),
            new RegExp('^(/node_modules$)'),
            new RegExp('.editorconfig'),
            new RegExp('.gitignore'),
            new RegExp('yarn.lock'),
            new RegExp('^(/README.md$)'),
            new RegExp('tsconfig.json'),
            new RegExp('tslint.json'),
        ],
        asar: true,
        overwrite: true,
        name: 'nugg-lens',
        // executableName: 'nugg-lens',
        appBundleId: `xyz.nugg.lens`,
        appCopyright: '2022 nugg.xyz LLC',
        darwinDarkModeSupport: true,
        appCategoryType: 'public.app-category.graphics-design',
        icon: './webpack/macos/AppIcon/AppIcon.icns',
        osxSign: exact<OsxSignOptions>({
            hardenedRuntime: false, // default is true
            'identity-validation': true, // default is true
            'pre-embed-provisioning-profile': true, // default is true
            'pre-auto-entitlements': true,
            'provisioning-profile': './.secrets/dev_id_nugg_lens.provisionprofile',
            entitlements: './webpack/macos/entitlements.plist',
            'entitlements-inherit': './webpack/macos/entitlements.plist',
            type: 'distribution',
            identity: 'Developer ID Application: nugg.xyz LLC (4497QJSAD3)',
            // identity: '3rd Party Mac Developer Application: nugg.xyz LLC (4497QJSAD3)',
            'gatekeeper-assess': false,
        }),
        osxNotarize: exact<OsxNotarizeOptions>({
            tool: 'notarytool',
            appleId: env.NUGG_APP_APPLE_ID_EMAIL,
            appleIdPassword: env.NUGG_APP_APPLE_ID_PASSWORD,
            teamId: '4497QJSAD3',
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
            platforms: ['win32'],
        },
        {
            name: '@electron-forge/maker-pkg',
            enabled: true,
            platforms: ['darwin'],
            config: exact<MakerPKGConfig>({
                install: '/Applications',
                identity: '3rd Party Mac Developer Installer: nugg.xyz LLC (4497QJSAD3)',
                // identity: 'Apple Distribution: nugg.xyz LLC (4497QJSAD3)',
            }),
        },
        {
            name: '@electron-forge/maker-dmg',
            enabled: false,
            platforms: ['darwin'],
            config: exact<MakerDMGConfig>({
                overwrite: true,
                name: 'dotnugg lens',
                format: 'UDCO',
                icon: './webpack/macos/AppIcon/icon.icns',
                debug: true,
                additionalDMGOptions: {
                    'background-color': '#ffffff',
                    window: {
                        size: {
                            width: 690,
                            height: 590,
                        },
                    },
                },
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
