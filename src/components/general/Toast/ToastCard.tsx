import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { IoClose, IoOpenOutline } from 'react-icons/io5';

import useOnHover from '../../../hooks/useOnHover';
import {
    isUndefinedOrNullOrBooleanFalse,
    isUndefinedOrNullOrNumberZero,
} from '../../../lib';
import Colors from '../../../lib/colors';
import Layout from '../../../lib/layout';
import AppState from '../../../state/app';
import AnimatedBarTimer from '../AnimatedTimers/BarTimer/BarTimer';
import Button from '../Buttons/Button/Button';
import Loader from '../Loader/Loader';
import Text from '../Texts/Text/Text';

import styles from './Toast.styles';

type Props = {
    toast: NL.Redux.App.Toast;
};

const ToastCard: FunctionComponent<Props> = ({ toast }) => {
    const [hidden, setHidden] = useState(true);
    const [close, setClose] = useState(false);

    useEffect(() => {
        if (!isUndefinedOrNullOrNumberZero(toast.duration)) {
            let id = setTimeout(() => setClose(true), toast.duration);
            return () => clearTimeout(id);
        }
    }, [toast.duration]);

    useEffect(() => {
        if (close) {
            setHidden(true);
            let id = setTimeout(
                () =>
                    AppState.dispatch.removeToastFromList({
                        index: toast.index,
                    }),
                500,
            );
            return () => clearTimeout(id);
        } else {
            let id = setTimeout(() => setHidden(false), 500);
            return () => clearTimeout(id);
        }
    }, [close, toast]);

    const style = useMemo(() => {
        return {
            ...(!hidden ? styles.visible : styles.hidden),
            ...(toast.error ? styles.error : styles.success),
            ...styles.toast,
            cursor: 'pointer',
            marginTop: '1rem',
            zIndex: 1000,
        };
    }, [toast, hidden]);

    const [ref, hovering] = useOnHover();
    const animatedS = useSpring({
        ...styles.toast,
        opacity: hovering ? 0 : 1,
        config: {
            duration: 100,
        },
    });

    return (
        <div style={style} ref={ref}>
            <animated.div style={animatedS}>
                <div
                    style={{
                        padding: '.5rem .75rem',
                        paddingRight: !isUndefinedOrNullOrBooleanFalse(
                            toast.loading,
                        )
                            ? '2rem'
                            : '.75rem',
                    }}>
                    <Text>{toast.title}</Text>
                    <Text size="smaller" textStyle={styles.text}>
                        {toast.message}
                    </Text>
                </div>
                {!isUndefinedOrNullOrBooleanFalse(toast.loading) && (
                    <Loader style={styles.toastLoader} color={Colors.green} />
                )}
                {!isUndefinedOrNullOrNumberZero(toast.duration) && (
                    <AnimatedBarTimer
                        duration={toast.duration}
                        style={styles.toastTimer}
                        color={
                            toast.error ? Colors.gradient3 : Colors.gradient2
                        }
                    />
                )}
            </animated.div>
            <animated.div
                style={{
                    opacity: animatedS.opacity.to([0, 1], [1, 0]),
                    position: 'absolute',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                <Button
                    buttonStyle={{ background: 'white' }}
                    onClick={() => setClose(true)}
                    rightIcon={<IoClose size={30} />}
                />
                {toast.action && (
                    <Button
                        buttonStyle={{
                            background: 'white',
                            borderRadius: Layout.borderRadius.large,
                            padding: '.6rem',
                        }}
                        onClick={() => toast.action(setClose)}
                        rightIcon={<IoOpenOutline size={30} />}
                    />
                )}
            </animated.div>
        </div>
    );
};

export default React.memo(ToastCard);
