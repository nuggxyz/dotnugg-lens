import lib from '@src/app/lib';

const styles = lib.layout.NLStyleSheetCreator({
    container: {
        pointerEvents: 'none',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: lib.layout.header.height,
        overflow: 'hidden',
        height: '100%',
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: '.2rem',
        padding: '0rem',
    },
    toast: {
        pointerEvents: 'auto',
        position: 'relative',
        transition: `all .5s ${lib.layout.animation}`,
        borderRadius: lib.layout.borderRadius.smallish,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        alignItems: 'left',
        padding: '0rem',
        background: lib.colors.background,
        justifyContent: 'center',
        overflow: 'hidden',
        // maxWidth: '300px',
    },
    toastTimer: {
        position: 'absolute',
        bottom: 0,
    },
    toastLoader: {
        position: 'absolute',
        right: '.5rem',
    },
    error: {
        color: lib.colors.nuggRed,
        boxShadow: lib.layout.boxShadow.dark,
    },
    success: {
        color: lib.colors.green,
        boxShadow: lib.layout.boxShadow.dark,
    },
    visible: {
        left: '1rem',
        opacity: 1,
    },
    hidden: {
        left: '0rem',
        opacity: 0,
    },
    text: {
        ...lib.layout.presets.font.main.bold,
        fontWeight: 'bold',
        color: lib.colors.textColor,
    },
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        height: '100%',
        flexGrow: 1,
        borderRadius: 0,
    },
});

export default styles;
