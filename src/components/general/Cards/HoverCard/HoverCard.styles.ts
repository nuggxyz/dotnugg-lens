import { NLStyleSheetCreator } from '../../../../lib';
import Layout from '../../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: 'black',
        // width: '100%',
        textDecoration: 'none',
        overflow: 'hidden',
        padding: '1rem 1rem',
        transition: `filter .5s ${Layout.animation}`,
    },
    link: {
        cursor: 'pointer',
    },
    hover: {
        filter: 'brightness(0.9)',
    },
});

export default styles;
