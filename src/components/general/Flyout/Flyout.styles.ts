import Colors from '../../../lib/colors';
import { NLStyleSheetCreator } from '../../../lib';
import Layout from '../../../lib/layout';

const styles = NLStyleSheetCreator({
    container: {
        backgroundColor: Colors.background,
        boxShadow: `${Layout.boxShadow.prefix} ${Colors.shadows.lightGrey}`,
        borderRadius: Layout.borderRadius.mediumish,
        display: 'inline-block',
        position: 'absolute',
        zIndex: 10000,
        userSelect: 'none',
        pointerEvents: 'auto',
    },
});

export default styles;
