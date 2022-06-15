import FontSize from '@src/lib/fontSize';
import lib, { NLStyleSheetCreator } from '@src/lib';

const styles = NLStyleSheetCreator({
    title: {
        fontFamily: lib.layout.fontFamily.monospace,
        // color: Colors.textColor,
    },
    text: {
        fontFamily: lib.layout.fontFamily.monospace,
        // color: Colors.textColor,
    },
    code: {
        fontFamily: lib.layout.fontFamily.monospace,
    },
    light: {
        fontWeight: 'lighter',
    },
    regular: {
        fontWeight: 'normal',
    },
    bold: {
        fontWeight: 'bold',
    },
    bolder: {
        fontWeight: 'bolder',
    },
    smaller: {
        fontSize: FontSize.p,
    },
    small: {
        fontSize: FontSize.h5,
    },
    medium: {
        fontSize: FontSize.h4,
    },
    large: {
        fontSize: FontSize.h3,
    },
    larger: {
        fontSize: FontSize.h2,
    },
    largest: {
        fontSize: FontSize.h1,
    },
});

export default styles;
