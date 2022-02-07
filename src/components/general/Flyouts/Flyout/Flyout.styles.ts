/** @format */

import Colors from '../../../../lib/colors';
import { NLStyleSheetCreator } from '../../../../lib';

const styles = NLStyleSheetCreator({
    container: {
        minWidth: '20.125rem',
        backgroundColor: Colors.background,
        border: '1px solid ' + Colors.beige,
        boxShadow:
            '0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        position: 'absolute',
        top: '0rem',
        right: '0rem',
        zIndex: 100,
        // ${({ theme }) => theme.mediaWidth.upToMedium`
        //   minWidth: 18.125rem;
        // `};
        userSelect: 'none',
    },
});

export default styles;
