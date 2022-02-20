import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import globalStyles from '../../../lib/globalStyles';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        boxShadow: `${Layout.boxShadow.prefix} ${Colors.shadows.nuggPink}`,
        borderRadius: Layout.borderRadius.medium,
        overflow: 'hidden',
        background: Colors.gradient3Transparent,
        height: '70%',
        position: 'absolute'
    },
    left: {
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        // background: Colors.transparentWhite,
    },
    right: {
        background: Colors.gradient3,
    },
    titleRenderItemContainer: {
        padding: '.5rem 2rem',
        ...globalStyles.backdropFilter,
        background: Colors.transparentLightGrey,
        textAlign: 'center',
    },
    titleRenderItemText: {
        color: 'white',
    },
    featureRenderItemContainer: {
        transition: `all ease 500ms`,
        width: '100%',
        padding: '.4rem 2rem',
        borderRadius: 0,
        justifyContent: 'space-between',
    },
    featureRenderItemBadge: {
        color: Colors.nuggRedText,
        background: Colors.transparentWhite,
        padding: '.4rem .8rem',
        borderRadius: Layout.borderRadius.large,
        marginLeft: '1rem',
    },
    childRenderItem: {
        justifyContent: 'space-between',
        padding: ' 0rem 1rem',
        borderRadius: 0,
    },
    detailContainer: {
        position: 'relative',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
    },
    detailSelectedItems: {
        display: 'flex',
        width: '500px',
        overflow: 'scroll',
        // background: Colors.transparentWhite,
        padding: '0rem .25rem',
    },
    detailSelectedItem: {
        position: 'relative',
        margin: '.5rem .25rem',
        background: Colors.transparentWhite,
        borderRadius: Layout.borderRadius.medium,
    },
    detailSelectedItemClose: {
        padding: '.3rem',
        borderRadius: Layout.borderRadius.large,
        position: 'absolute',
        top: '.5rem',
        right: '.5rem',
    },
    detailEmptyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    detailLoading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '.3rem .7rem',
        background: Colors.transparentLightGrey,
        borderRadius: Layout.borderRadius.large,
        position: 'absolute',
        top: '-2rem'
    },
});

export default styles;
