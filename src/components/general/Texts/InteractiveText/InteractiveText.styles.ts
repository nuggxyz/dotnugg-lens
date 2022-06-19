import Colors from '@src/lib/colors';
import Layout from '@src/lib/layout';
import { NLStyleSheetCreator } from '@src/lib';

const styles = NLStyleSheetCreator({
    container: {
        cursor: 'pointer',
    },
    text: {
        transition: `.5s ${Layout.animation} color`,
    },
    selected: {
        color: Colors.tintColor,
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    border: {
        width: '0%',
        height: '1.5px',
        marginTop: '.1rem',
        marginBottom: '.2rem',
        background: 'white',
        transition: `.5s ${Layout.animation} width, .5s ${Layout.animation} background`,
    },
    borderSelected: {
        width: '100%',
        background: Colors.tintColor,
    },
    badgeStyle: {
        height: '2rem',
        width: '2rem',
        borderRadius: '50%',
        background: Colors.darkerGray,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginLeft: '3rem',
        fontWeight: 'bold',
        transition: `.5s ${Layout.animation} background`,
    },
    badgeSelected: {
        background: Colors.tintColor,
    },
});

export default styles;
