import { useCallback, useEffect, useRef } from 'react';

import { isUndefinedOrNullOrNotNumber } from '../lib';

type Props = {};

const useAnimationFrame = (
    callback: (time: number) => void,
    dependencyArray: any[] = [],
) => {
    const previousTime = useRef<number>();
    const previousRequest = useRef<number>();
    const animate = useCallback((time: number) => {
        if (!isUndefinedOrNullOrNotNumber(previousTime.current)) {
            const deltaTime = time - previousTime.current;
            callback(deltaTime);
        }
        previousTime.current = time;
        previousRequest.current = requestAnimationFrame(animate);
    }, dependencyArray);

    useEffect(() => {
        previousRequest.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(previousRequest.current);
        // @ts-ignore
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animate]);
};

export default useAnimationFrame;
