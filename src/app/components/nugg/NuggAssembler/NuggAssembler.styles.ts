import lib from '@src/app/lib';
import globalStyles from '@src/app/lib/globalStyles';
import Layout from '@src/app/lib/layout';

const styles = lib.layout.NLStyleSheetCreator({
    container: {
        boxShadow: `${Layout.boxShadow.prefix} ${lib.layout.boxShadow.basic}`,
        borderRadius: Layout.borderRadius.medium,
        border: 'none',
        overflow: 'hidden',
        background: lib.colors.gradient3Transparent,
        height: '75%',
        width: '90%',
        position: 'absolute',
    },
    left: {
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        // background: lib.colors.transparentWhite,
    },
    right: {
        background: lib.colors.gradient3,
    },
    titleRenderItemContainer: {
        padding: '.5rem 2rem',
        ...globalStyles.backdropFilter,
        background: lib.colors.transparentLightGrey,
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
        color: lib.colors.nuggRedText,
        background: lib.colors.transparentWhite,
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
        background: lib.colors.transparentWhite,
        borderRadius: Layout.borderRadius.medium,
    },
    detailChildrenderItem: {
        position: 'relative',
        margin: '.5rem .25rem',
        background: lib.colors.transparentWhite,
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
        top: '.5rem',
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
        background: lib.colors.transparentLightGrey,
        borderRadius: Layout.borderRadius.large,
        position: 'absolute',
        top: '-3rem',
        zIndex: 5,
    },
});

export default styles;
