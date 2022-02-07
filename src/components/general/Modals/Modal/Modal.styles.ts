import Colors from '../../../../lib/colors';
import Layout from '../../../../lib/layout';
import { NLStyleSheetCreator } from '../../../../lib';

const styles = NLStyleSheetCreator({
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        background: 'transparent',
        transition: `opacity .5s ${Layout.animation}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 999,
    },
    open: {
        opacity: 1,
        background: Colors.transparentGrey,
        zIndex: 999,
        overflow: 'hidden',
    },
    closed: {
        opacity: 0,
        background: 'transparent',
    },
    container: {
        background: Colors.transparentDarkGrey,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: `.2s all ${Layout.animation}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: Layout.borderRadius.largish,
        padding: '1rem',
        width: '100%',
        transform: 'translate(1.5rem, 1.5rem)',
    },
    containerFull: { width: '100%', minWidth: '630px' },
    containerMobile: {
        width: '90%',
        maxHeight: '100%',
        margin: '0rem',
        // margin: '0rem .5rem',
        transform: 'translate(0rem, 0rem)',
        justifyContent: 'flex-start',
        minWidth: '0px',
    },
    containerOpen: {
        transform: 'translate(.5rem, .5rem)',
    },
    containerBackground: {
        position: 'absolute',
        background: Colors.gradient2,
        transition: `.2s all ${Layout.animation}`,
        opacity: 1,
        width: '100%',
        padding: '1rem',
        height: '100%',
        borderRadius: Layout.borderRadius.largish,
    },
    containerBackgroundOpen: { transform: 'translate(-.2rem, -.2rem)' },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export default styles;
