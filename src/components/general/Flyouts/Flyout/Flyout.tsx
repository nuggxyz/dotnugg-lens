import React, {
    CSSProperties,
    FunctionComponent,
    PropsWithChildren,
} from 'react';
import { animated, config, useTransition } from 'react-spring';

import useOnHover from '../../../../hooks/useOnHover';

import styles from './Flyout.styles';

type Props = {
    button: JSX.Element;
    style?: CSSProperties;
};

const Flyout: FunctionComponent<PropsWithChildren<Props>> = ({
    style,
    button,
    children,
}) => {
    const [open, setOpen] = React.useState(false);
    const [openRef, openHover] = useOnHover(() => setOpen(true));
    const [closeRef, closeHover] = useOnHover(() =>
        setOpen(openHover || closeHover),
    );

    const transition = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.default,
    });

    return (
        <div ref={openRef}>
            <div onClick={() => setOpen(false)}>{button}</div>
            {transition(
                (animatedStyle, open) =>
                    open && (
                        <animated.div
                            //@ts-ignore
                            ref={closeRef}
                            style={{
                                ...styles.container,
                                ...style,
                                ...animatedStyle,
                            }}>
                            {children}
                        </animated.div>
                    ),
            )}
        </div>
    );
};

export default React.memo(Flyout);
