import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        pointerEvents: 'none',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
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
        right: '1rem',
        opacity: 1,
    },
    hidden: {
        right: '0rem',
        opacity: 0,
    },
    text: {
        fontFamily: Layout.font.inter.bold,
        fontWeight: 'bold',
    },
});

export default styles;
