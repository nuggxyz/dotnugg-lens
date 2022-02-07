import Colors from '../../../../lib/colors';
import { NLStyleSheetCreator } from '../../../../lib/index';

const styles = NLStyleSheetCreator({
    barContainer: {
        width: '100%',
        height: '5px',
        position: 'absolute',
        bottom: 0,
    },
    timer: {
        width: '100%',
        height: '100%',
        background: Colors.primaryColor,
        transition: `width .1s ease`,
    },
});

export default styles;
