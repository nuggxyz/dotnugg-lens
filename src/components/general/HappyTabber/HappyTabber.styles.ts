import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import globalStyles from '../../../lib/globalStyles';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    wrapperContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
    },
    wrapperMobile: {
        flexDirection: 'column-reverse',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Layout.borderRadius.medium,
        height: '44px',
        padding: '4px',
        width: '100%',
        flexDirection: 'row',
    },
    headerTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 5,
    },
    headerTextBold: { fontWeight: 'bold', fontFamily: Layout.font.sf.bold },
    headerText: {
        fontFamily: Layout.font.sf.regular,
    },
    headerTextMobile: {
        fontFamily: Layout.font.sf.regular,
        textShadow: `0 0 20px ${Colors.textColor}`,
    },
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color: 'black',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    item: {
        position: 'absolute',
    },
    activeButton: {
        // background: Colors.gradient,
        color: 'white',
    },
    wrapper: {
        padding: '1rem',
        width: '100%',
        height: '100%',
    },
    selectionIndicator: {
        height: '34px',
        position: 'absolute',
        zIndex: 4,
        // backgroundColor: 'rgba(80, 144, 234, 0.4)',
        background: Colors.transparentWhite,
        borderRadius: Layout.borderRadius.mediumish,
        ...globalStyles.backdropFilter,
    },
});

export default styles;
