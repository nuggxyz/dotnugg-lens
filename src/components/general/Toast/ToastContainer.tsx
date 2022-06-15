import React, { FunctionComponent } from 'react';
import { animated, useTransition } from '@react-spring/web';

import { sortByField } from '@src/lib';
import client from '@src/client';
import { ToastType } from '@src/interfaces/toasts';

import styles from './Toast.styles';
import ToastCard from './ToastCard';

type Props = Record<string, never>;

const ToastContainer: FunctionComponent<Props> = () => {
    const toasts = client.toast.useList();

    // https://codesandbox.io/s/github/pmndrs/react-spring/tree/master/demo/src/sandboxes/list-reordering?file=/src/App.tsx:932-959
    const transitions = useTransition(
        sortByField([...toasts], 'index', false).map((x) => {
            // eslint-disable-next-line no-return-assign
            return {
                ...x,
                y: x.index * 70,
            };
        }),
        {
            key: (item: ToastType) => item.id,
            from: { height: 0, opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y }) => ({ y, opacity: 1 }),
            update: ({ y }) => ({ y }),
        },
    );
    return (
        <div style={{ ...styles.container, flexDirection: 'column' }}>
            {transitions((style, item) => (
                <animated.div key={item.id} style={style as CSSPropertiesAnimated}>
                    <ToastCard toast={item} />
                </animated.div>
            ))}
        </div>
    );
};

export default ToastContainer;
