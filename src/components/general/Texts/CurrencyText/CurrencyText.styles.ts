import { NLStyleSheetCreator } from '../../../../lib';
import Layout from '../../../../lib/layout';

const styles = NLStyleSheetCreator({
    textStyle: {
        fontFamily: Layout.font.code.regular,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;
