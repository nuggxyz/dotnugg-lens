import React, {
    CSSProperties,
    FunctionComponent,
    PropsWithChildren,
} from 'react';

import useOnClickOutside from '../../../../hooks/useOnClickOutside';

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

    const closeModal = React.useCallback(() => setOpen(false), [setOpen]);

    const node = React.useRef<HTMLDivElement>();

    useOnClickOutside(node, closeModal);

    return (
        <>
            <div style={{ display: 'flex' }} onClick={() => setOpen(!open)}>
                {button}
            </div>

            {open && (
                <div ref={node} style={{ ...styles.container, ...style }}>
                    {children}
                </div>
            )}
        </>
    );
};

export default React.memo(Flyout);
