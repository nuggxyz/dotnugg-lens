import Colors from '../../../../lib/colors';
import FontSize from '../../../../lib/fontSize';
import { NLStyleSheetCreator } from '../../../../lib/index';

const styles = NLStyleSheetCreator({
    container: {
        width: '100%',
        display: 'flex',
    },
    bottomBorder: {
        borderBottom: `1px solid ${Colors.darkerGray}`,
    },
    containerMulti: {
        marginBottom: '1rem',
    },
    headingContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        marginLeft: '.2rem',
    },
    marginTop: {
        marginTop: '1rem',
    },
    headingText: {
        fontWeight: 600,
        margin: 0,
    },
    warningContainer: {
        marginLeft: '1rem',
        flexDirection: 'row',
        display: 'flex',
        padding: 0,
        marginBottom: '.1rem',
    },
    warningText: {
        color: 'red',
        alignSelf: 'flex-end',
        padding: 0,
        margin: 0,
    },
    warningIcon: {
        background: 'red',
        padding: '.1rem .5rem .2rem .5rem',
        borderRadius: '1rem',
        marginLeft: '.5rem',
    },
    textInput: {
        fontSize: '15px',
        margin: '-5 auto',
        letterSpacing: '1px',
        border: 'none',
        outline: 'none',
        flexGrow: 0.5,
        background: '#00000000',
        width: '100%',
    },
    code: {
        fontFamily: 'Monaco',
        color: 'white',
        fontSize: FontSize.button,
    },
    multi: {
        resize: 'none',
        height: '15rem',
    },
    border: {
        border: `1px solid ${Colors.darkerGray}`,
        borderRadius: '.3rem',
        background: 'white',
    },
    subContainer: {
        display: 'flex',
        justifyContent: 'evenly',
        alignItems: 'center',
    },
});

export default styles;
