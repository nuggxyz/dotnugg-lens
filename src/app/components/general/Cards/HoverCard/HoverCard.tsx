import React, { CSSProperties, FunctionComponent, useState } from 'react';

import styles from './HoverCard.styles';

type Props = {
    children: React.ReactNode;
    style?: CSSProperties;
    action?: () => void;
};

const HoverCard: FunctionComponent<Props> = ({ children, action, style }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onClick={action}
            onMouseEnter={action ? () => setHover(true) : undefined}
            onMouseLeave={
                action
                    ? (event) => {
                          //@ts-ignore
                          if (event.relatedTarget.nodeName === 'IMG') {
                              return;
                          }
                          setHover(false);
                      }
                    : action
            }
            style={{
                ...styles.container,
                ...style,
                ...(hover && styles.hover),
                ...(action && styles.link),
            }}>
            {children}
        </div>
    );
};

export default React.memo(HoverCard);
