import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import globalStyles from '../../../lib/globalStyles';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        boxShadow: `${Layout.boxShadow.prefix} ${Colors.shadows.nuggPink}`,
        borderRadius: Layout.borderRadius.medium,
        border: 'none',
        overflow: 'hidden',
        background: Colors.gradient3Transparent,
        height: '75%',
        width: '90%',
        position: 'absolute',
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
        height: '100%',
        width: '400px',
    },
    detailSelectedItems: {
        display: 'flex',
        // minWidth: '500px',
        overflow: 'scroll',
        padding: '0rem .25rem',
    },
    detailSelectedItem: {
        position: 'relative',
        margin: '.5rem .25rem',
        background: Colors.transparentWhite,
        borderRadius: Layout.borderRadius.medium,
    },
    detailChildrenderItem: {
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
        left: '.5rem',
        zIndex: 1000,
    },
    detailSelectedItemId: {
        padding: '.3rem',
        borderRadius: Layout.borderRadius.large,
        position: 'absolute',
        top: '.1rem',
        right: '.1rem',
        // background: 'white',
    },
    detailSelectedVsCode: {
        padding: '.3rem',
        borderRadius: Layout.borderRadius.large,
        position: 'absolute',
        top: '2.3rem',
        left: '.5rem',
        zIndex: 1000,
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
        top: '-2rem',
        zIndex: 5,
    },
});

export default styles;
