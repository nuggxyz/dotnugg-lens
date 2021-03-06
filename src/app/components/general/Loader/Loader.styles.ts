import Colors from '@src/app/lib/colors';
import Layout from '@src/app/lib/layout';
import { NLStyleSheetCreator } from '@src/app/lib';

const styles = NLStyleSheetCreator({
    loader: {
        borderRadius: '100%',
        borderBottom: `2px solid ${Colors.blue}`,
        borderRight: `2px solid ${Colors.blue}`,
        borderLeft: `2px solid ${Colors.blue}`,
        borderTop: '2px solid transparent',
        height: '1rem',
        width: '1rem',
        transform: 'rotate(0turn)',
        transition: `transform .5s ${Layout.animation}`,
    },
});

export default styles;
