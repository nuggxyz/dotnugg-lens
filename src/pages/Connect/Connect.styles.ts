import { NLStyleSheetCreator } from '../../lib';
import Colors from '../../lib/colors';
import Layout from '../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: Colors.gradient3,
        borderRadius: Layout.borderRadius.largish,
        boxShadow: `${Layout.boxShadow.prefix} ${Colors.shadows.nuggPink}`,
        padding: '1.5rem',
        width: '350px',
    },
    titleText: {
        color: 'white',
        marginBottom: '1.5rem',
    },
    text: {
        color: Colors.textColor,
        margin: '0rem .5rem 1.5rem .5rem',
    },
    textInput: {
        textAlign: 'left',
        width: '100%',
        background: Colors.transparentLightGrey,
        padding: '.5rem .7rem',
        margin: '0rem .5rem',
        borderRadius: Layout.borderRadius.smallish,
        color: 'white',
    },
    button: {
        borderRadius: Layout.borderRadius.large,
        width: '100%',
        marginTop: '1rem',
        padding: '.3rem 1rem',
        color: Colors.nuggRedText,
    },
    loader: {
        position: 'absolute',
        right: '.75rem',
    },
});

export default styles;
