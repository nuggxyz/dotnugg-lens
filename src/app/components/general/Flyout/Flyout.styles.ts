import lib from '@src/app/lib';

const styles = lib.layout.NLStyleSheetCreator({
    container: {
        backgroundColor: lib.colors.background,
        boxShadow: `${lib.layout.boxShadow.prefix} ${lib.colors.shadowLightGrey}`,
        borderRadius: lib.layout.borderRadius.mediumish,
        display: 'inline-block',
        position: 'absolute',
        zIndex: 10000,
        userSelect: 'none',
        // pointerEvents: 'auto',
        overflow: 'hidden',
    },
});

export default styles;
