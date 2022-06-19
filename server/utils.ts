import * as os from 'os';

const pathDelimiter = () => {
    return os.platform() === 'win32' ? '\\' : '/';
};

const asepritePath = () => {
    let asepriteLocation = '"/Applications/Aseprite.app/Contents/MacOS/aseprite"';
    if (os.platform() === 'win32') {
        asepriteLocation = '"C:\\Program Files\\Aseprite\\Aseprite.exe"';
    }
    return asepriteLocation;
};

export default { pathDelimiter, asepritePath };
