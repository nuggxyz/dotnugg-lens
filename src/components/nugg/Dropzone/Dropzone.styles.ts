import { NLStyleSheetCreator } from '@src/lib';
import Colors from '@src/lib/colors';
import globalStyles from '@src/lib/globalStyles';

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
