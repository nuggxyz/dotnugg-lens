import React, { CSSProperties, FunctionComponent, useRef } from 'react';

import useAnimationFrame from '../../../../hooks/useAnimationFrame';
import {
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
} from '../../../../lib';

import styles from './BarTimer.styles';
type Props = {
    duration: number;
    style?: CSSProperties;
    color?: string;
};

const AnimatedBarTimer: FunctionComponent<Props> = ({
    duration,
    color,
    style,
}) => {
    const ref = useRef<HTMLDivElement>();
    let time = duration;
    useAnimationFrame(
        (t) => {
            if (time > 0 && ref.current && ref.current.style) {
                time -= t;
                ref.current.style.width = `${(time / duration) * 100}%`;
            }
        },
        [duration],
    );
    return (
        <div
            style={{
                ...styles.barContainer,
                ...(!isUndefinedOrNullOrObjectEmpty(style) ? style : {}),
            }}>
            <div
                style={{
                    ...styles.timer,
                    ...(!isUndefinedOrNullOrStringEmpty(color)
                        ? { background: color }
                        : {}),
                }}
                ref={ref}
            />
        </div>
    );
};

export default React.memo(AnimatedBarTimer);
