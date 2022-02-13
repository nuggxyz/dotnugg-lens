import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    artLocationContainer: {
        position: 'absolute',
        top: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '.5rem',
    },
    artLocationPicker: {
        color: Colors.nuggBlueText,
    },
    artLocationDelete: {
        marginRight: '.5rem',
        marginBottom: '.4rem',
        borderRadius: Layout.borderRadius.large,
        background: Colors.nuggBlueTransparent,
        padding: '.2rem ',
    },
    flyoutContainer: {
        position: 'absolute',
        left: '0',
        top: '2rem',
        overflow: 'hidden',
    },
    flyoutSelect: {
        justifyContent: 'flex-start',
        padding: '.4rem .7rem',
        borderRadius: 0,
    },
    flyoutSelectText: {
        whiteSpace: 'nowrap',
    },
    flyoutSelectIcon: {
        marginRight: '.5rem',
    },
});

export default styles;
