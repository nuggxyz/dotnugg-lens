import lib from '@src/app/lib';

const styles = lib.layout.NLStyleSheetCreator({
    button: {
        background: lib.colors.secondaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: lib.layout.borderRadius.small,
        flexDirection: 'row',
        padding: '.5rem 1rem',
        cursor: 'pointer',
        color: 'black',
        transition: 'filter .2s ease',
    },
    text: {
        margin: 0,
    },
});

export default styles;
