import { NLStyleSheetCreator } from '@src/app/lib';
import Colors from '@src/app/lib/colors';
import Layout from '@src/app/lib/layout';

const styles = NLStyleSheetCreator({
    artLocationContainer: {},
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
    flyoutContainer: {},
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
