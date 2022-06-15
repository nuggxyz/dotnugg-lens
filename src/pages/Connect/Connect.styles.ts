import Layout from '@src/lib/layout';
import lib, { NLStyleSheetCreator } from '@src/lib';

const styles = NLStyleSheetCreator({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: lib.colors.gradient3,
        borderRadius: Layout.borderRadius.largish,
        boxShadow: `${Layout.boxShadow.prefix} ${lib.layout.boxShadow.dark}`,
        padding: '1.5rem',
        width: '350px',
    },
    titleText: {
        color: 'white',
        marginBottom: '1.5rem',
    },
    text: {
        color: lib.colors.textColor,
        margin: '0rem .5rem 1.5rem .5rem',
        textAlign: 'center',
    },
    textInput: {
        textAlign: 'left',
        width: '100%',
        background: lib.colors.transparentLightGrey,
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
        color: lib.colors.nuggRedText,
    },
    loader: {
        position: 'absolute',
        right: '.75rem',
    },
});

export default styles;
