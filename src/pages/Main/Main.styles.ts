import { NLStyleSheetCreator } from '../../lib';
import Colors from '../../lib/colors';
import globalStyles from '../../lib/globalStyles';
import Layout from '../../lib/layout';

const styles = NLStyleSheetCreator({
    powerButton: {
        position: 'absolute',
        top: '1.5rem',
        right: '2rem',
    },
    trayButton: {
        position: 'absolute',
        top: '1.5rem',
        right: '5.5rem',
    },
    badge: {
        position: 'absolute',
        top: '-.4rem',
        right: '-.2rem',
        color: 'white',
        background: Colors.nuggRedText,
        padding: '.2rem .4rem',
        borderRadius: Layout.borderRadius.large,
        fontFamily: Layout.font.code.regular,
    },
    artLocationPicker: {
        color: Colors.nuggBlueText,
    },
    buttonRound: {
        borderRadius: Layout.borderRadius.large,
        background: Colors.nuggBlueTransparent,
        padding: '.5rem ',
    },
    buttonRoundSmall: {
        borderRadius: Layout.borderRadius.large,
        background: Colors.nuggBlueTransparent,
        padding: '.1rem ',
    },
    buttonLong: {
        borderRadius: Layout.borderRadius.large,
        background: Colors.nuggBlueTransparent,
        padding: '.5rem 1rem',
    },
});

export default styles;
