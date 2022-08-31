import { makeUniversalApp } from '@electron/universal';
import path from 'path';

const makeUniversal = async () => {
    await makeUniversalApp({
        force: true,
        x64AppPath: path.resolve(__dirname, '../../out/nugg-lens-mas-x64/nugg-lens.app'),
        arm64AppPath: path.resolve(__dirname, '../../out/nugg-lens-mas-arm64/nugg-lens.app'),
        outAppPath: path.resolve(__dirname, '../../macos/lens/nugg-lens.app'),
    });
};

makeUniversal();
