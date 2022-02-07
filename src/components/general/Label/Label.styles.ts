import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0.3em 0.5em',
        borderRadius: Layout.borderRadius.large,
        background: Colors.transparentWhite,
    },
    basic: {
        background: 'none #ffffff',
        border: '4px solid rgba(34, 36, 38, 0.35)',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: 'none',
    },
    text: {
        fontSize: '.7rem',
    },
});

export default styles;
