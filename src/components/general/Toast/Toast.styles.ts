import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        pointerEvents: 'none',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: Layout.header.height,
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
        transition: `all .5s ${Layout.animation}`,
        borderRadius: Layout.borderRadius.smallish,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        alignItems: 'left',
        padding: '0rem',
        background: Colors.background,
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
        color: Colors.nuggRed,
        boxShadow: Layout.boxShadow.dark,
    },
    success: {
        color: Colors.green,
        boxShadow: Layout.boxShadow.dark,
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
        fontFamily: Layout.font.inter.bold,
        fontWeight: 'bold',
        color: Colors.textColor,
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
