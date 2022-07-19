import lib from '@src/app/lib';
import globalStyles from '@src/app/lib/globalStyles';

const styles = lib.layout.NLStyleSheetCreator({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'scroll',
    },
    label: {
        fontWeight: 600,
        margin: 0,
        marginLeft: '.2rem',
        paddingTop: '1rem',
    },
    border: {
        border: `1px solid ${lib.colors.darkerGray}`,
        borderRadius: '.3rem',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // flexWrap: 'wrap',
    },
    separator: {
        height: '1px',
        width: '100%',
    },
    labelContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '.5rem',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sticky: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    noItems: {
        // ...globalStyles.fillWidth,
        ...globalStyles.centered,
    },
});

export default styles;
