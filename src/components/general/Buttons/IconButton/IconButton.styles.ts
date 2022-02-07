/** @format */

import { NLStyleSheetCreator } from '../../../../lib';
import Layout from '../../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        background: 'transparent',
        // padding: '0rem',
    },
    hoverOn: {
        opacity: 0.5,
        transition: `opacity .7s ${Layout.animation}`,
    },
    hoverOff: {
        opacity: 1,
        transition: `opacity .7s ${Layout.animation}`,
    },
});

export default styles;
