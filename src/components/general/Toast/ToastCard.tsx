import { useSpring, animated } from '@react-spring/web';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { IoClose, IoOpenOutline } from 'react-icons/io5';

import { ToastType } from '@src/interfaces/toasts';
import useOnHover from '@src/hooks/useOnHover';
import lib, { isUndefinedOrNullOrBooleanFalse, isUndefinedOrNullOrNumberZero } from '@src/lib';
import AnimatedBarTimer from '@src/components/general/AnimatedTimers/BarTimer/BarTimer';
import Button from '@src/components/general/Buttons/Button/Button';
import Loader from '@src/components/general/Loader/Loader';
import Text from '@src/components/general/Texts/Text/Text';
import client from '@src/client';

import styles from './Toast.styles';

type Props = {
    toast: ToastType;
};

const ToastCard: FunctionComponent<Props> = ({ toast }) => {
    const [hidden, setHidden] = useState(true);
    const [close, setClose] = useState(false);
    const removeToast = client.toast.useRemoveToast();

    useEffect(() => {
        setDuration(toast.duration);
        setError(toast.error);
    }, [toast]);

    const [duration, setDuration] = useState(toast.duration);
    const [error, setError] = useState(toast.error);

    useEffect(() => {
        if (!isUndefinedOrNullOrNumberZero(duration)) {
            const id = setTimeout(() => setClose(true), duration);
            return () => clearTimeout(id);
        }
        return () => undefined;
    }, [duration]);

    useEffect(() => {
        if (toast?.listener) {
            const list = toast.listener(
                () => setClose(true),
                () => setDuration(2000),
                () => setError(true),
            );
            return list;
        }
        return undefined;
    }, []);

    useEffect(() => {
        if (close) {
            setHidden(true);
            const id = setTimeout(() => {
                removeToast(toast);
            }, 500);
            return () => clearTimeout(id);
        }
        return () => undefined;
    }, [close]);

    useEffect(() => {
        const id = setTimeout(() => setHidden(false), 500);
        return () => clearTimeout(id);
    }, [toast]);

    const style = useMemo(() => {
        return {
            ...(!hidden ? styles.visible : styles.hidden),
            ...(error ? styles.error : styles.success),
            ...styles.toast,
            cursor: 'pointer',
            marginTop: '1rem',
            zIndex: 1000,
        };
    }, [hidden, error]);

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
                        paddingRight: !isUndefinedOrNullOrBooleanFalse(toast.loading)
                            ? '2rem'
                            : '.75rem',
                    }}
                >
                    <Text>{toast.title}</Text>
                    <Text size="smaller" textStyle={styles.text}>
                        {toast.message}
                    </Text>
                </div>
                {!isUndefinedOrNullOrBooleanFalse(toast.loading) && (
                    <Loader style={styles.toastLoader} color={lib.colors.green} />
                )}
                {!isUndefinedOrNullOrNumberZero(duration) && (
                    <AnimatedBarTimer
                        duration={duration}
                        style={styles.toastTimer}
                        color={error ? lib.colors.gradient3 : lib.colors.gradient2}
                    />
                )}
            </animated.div>
            <animated.div
                style={{
                    opacity: animatedS.opacity.to([0, 1], [1, 0]),
                    ...styles.buttonContainer,
                }}
            >
                <Button
                    buttonStyle={styles.button}
                    onClick={() => setClose(true)}
                    rightIcon={<IoClose size={30} />}
                />
                {toast.action !== undefined && (
                    <Button
                        buttonStyle={styles.button}
                        // idk why but we need both checks for toast action here
                        onClick={() => toast.action !== undefined && toast.action(setClose)}
                        rightIcon={<IoOpenOutline size={30} />}
                    />
                )}
            </animated.div>
        </div>
    );
};

export default React.memo(ToastCard);
