import { NLStyleSheetCreator } from '../../../lib';
import Colors from '../../../lib/colors';
import globalStyles from '../../../lib/globalStyles';

const styles = NLStyleSheetCreator({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    background: {
        ...globalStyles.backdropFilter,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    text: {
        position: 'absolute',
        color: Colors.nuggBlueText,
    },
});

export default styles;
