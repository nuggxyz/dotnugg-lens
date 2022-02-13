import { NLStyleSheetCreator } from './index';

const globalStyles = NLStyleSheetCreator({
    absoluteFill: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    fillWidth: {
        width: '100%',
    },
    fillHeight: {
        height: '100%',
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    backdropFilter: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
    },
    centerFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});

export default globalStyles;
