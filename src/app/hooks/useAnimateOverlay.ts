import { useSpring, UseSpringProps } from '@react-spring/web';

import { NLStyleSheetCreator } from '@src/app/lib';

const useAnimateOverlay = (isOpen: boolean, style?: UseSpringProps<any>) => {
    const [wrapperStyle] = useSpring(
        {
            to: {
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
            },
        },
        [isOpen],
    );
    return { ...styles.wrapper, ...wrapperStyle, ...style };
};

export default useAnimateOverlay;

const styles = NLStyleSheetCreator({
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        background: 'transparent',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflow: 'hidden',
        zIndex: 999,
    },
    mobile: {},
});
