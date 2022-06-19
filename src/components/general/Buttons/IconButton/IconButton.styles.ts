import lib from '@src/lib';

const styles = lib.layout.NLStyleSheetCreator({
    container: {
        background: 'transparent',
        // padding: '0rem',
    },
    hoverOn: {
        opacity: 0.5,
        transition: `opacity .7s ${lib.layout.animation}`,
    },
    hoverOff: {
        opacity: 1,
        transition: `opacity .7s ${lib.layout.animation}`,
    },
});

export default styles;
