import { NLStyleSheetCreator } from '@src/lib';
import Colors from '@src/lib/colors';
import Layout from '@src/lib/layout';

const styles = NLStyleSheetCreator({
    artLocationContainer: {
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
        left: '-.6rem',
        top: '2.1rem',
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
    divider: {
        width: '100%',
        height: '5px',
        background: Colors.transparentLightGrey,
    },
});

export default styles;
