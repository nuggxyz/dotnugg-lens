import { NLStyleSheetCreator } from '@src/app/lib';
import Colors from '@src/app/lib/colors';
import globalStyles from '@src/app/lib/globalStyles';

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
