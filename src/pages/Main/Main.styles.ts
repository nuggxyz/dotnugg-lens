import lib from '@src/lib';

const styles = lib.layout.NLStyleSheetCreator({
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
        background: lib.colors.nuggRedText,
        padding: '.2rem .4rem',
        borderRadius: lib.layout.borderRadius.large,
        fontFamily: lib.layout.fontFamily.monospace,
    },
    artLocationPicker: {
        color: lib.colors.nuggBlueText,
    },
    buttonRound: {
        borderRadius: lib.layout.borderRadius.large,
        background: lib.colors.nuggBlueTransparent,
        padding: '.5rem ',
    },
    buttonRoundSmall: {
        borderRadius: lib.layout.borderRadius.large,
        background: lib.colors.nuggBlueTransparent,
        padding: '.1rem ',
    },
    buttonLong: {
        borderRadius: lib.layout.borderRadius.large,
        background: lib.colors.nuggBlueTransparent,
        padding: '.5rem 1rem',
    },
    loaderContainer: {
        position: 'absolute',
        top: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '.5rem .7rem',
        background: lib.colors.transparentWhite,
        borderRadius: lib.layout.borderRadius.mediumish,
    },
});

export default styles;
