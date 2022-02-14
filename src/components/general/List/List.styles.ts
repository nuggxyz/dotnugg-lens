import Colors from '../../../lib/colors';
import FontSize from '../../../lib/fontSize';
import Layout from '../../../lib/layout';
import { NLStyleSheetCreator } from '../../../lib/index';

const styles = NLStyleSheetCreator({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'scroll',
    },
    label: {
        fontWeight: 600,
        margin: 0,
        marginLeft: '.2rem',
        paddingTop: '1rem',
    },
    border: {
        border: `1px solid ${Colors.darkerGray}`,
        borderRadius: '.3rem',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    separator: {
        height: '1px',
        width: '100%',
    },
    labelContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '.5rem',
    },
    sticky: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
    },
    // noItems: {
    //     fontFamily: Layout.font.inter.bold,
    //     fontSize: FontSize.h5,
    // },
});

export default styles;
