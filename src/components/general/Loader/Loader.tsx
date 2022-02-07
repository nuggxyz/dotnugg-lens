import React, { CSSProperties, FunctionComponent } from 'react';

import {
    isUndefinedOrNullOrObjectEmpty,
    isUndefinedOrNullOrStringEmpty,
} from '../../../lib';

import styles from './Loader.styles';
import './Loader.css';

type Props = { style?: CSSProperties; color?: string };

const Loader: FunctionComponent<Props> = ({ style, color }) => {
    return (
        <div
            className="loader"
            style={{
                ...styles.loader,
                ...(!isUndefinedOrNullOrObjectEmpty(style) ? style : {}),
                ...(!isUndefinedOrNullOrStringEmpty(color)
                    ? {
                          borderRightColor: color,
                          borderLeftColor: color,
                          borderBottomColor: color,
                      }
                    : {}),
            }}
        />
    );
};

export default React.memo(Loader);
