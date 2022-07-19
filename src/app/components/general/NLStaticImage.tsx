import React, { CSSProperties, FunctionComponent, useMemo } from 'react';

import eth from '../../assets/images/currency/eth.svg';
import metamask from '../../assets/images/nugg/metamask-full.webp';
import walletconnect from '../../assets/images/nugg/walletconnect-full.png';
import nugg from '../../assets/images/nugg/nugg-white.png';

type Props = {
    image: NLStaticImageKey;
    style?: CSSProperties;
};

export type NLStaticImageKey = 'nugg' | 'MetaMask' | 'eth' | 'WalletConnect';

const NLStaticImage: FunctionComponent<Props> = ({ image, style }) => {
    const img = useMemo(() => {
        switch (image) {
            case 'MetaMask':
                return (
                    <img
                        src={metamask}
                        height={48}
                        width={128}
                        style={{ objectFit: 'cover', height: 23.8, ...style }}
                    />
                );
            case 'WalletConnect':
                return (
                    <img
                        src={walletconnect}
                        height={23.8}
                        width={149.5}
                        style={style}
                    />
                );
            case 'eth':
                return <img src={eth} height={20} width={20} style={style} />;
            case 'nugg':
                return <img src={nugg} height={35} width={35} style={style} />;
            default:
                return null;
        }
    }, [image]);
    return img;
};

export default React.memo(NLStaticImage);
