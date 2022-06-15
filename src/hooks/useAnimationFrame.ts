import { DependencyList, useCallback, useEffect, useRef } from 'react';

const useAnimationFrame = (callback: (time: number) => void, deps: DependencyList) => {
    const previousTime = useRef<number>();
    const previousRequest = useRef<number>();

    const animate = useCallback(
        (time: number) => {
            if (previousTime.current !== undefined) {
                const deltaTime = time - previousTime.current;
                callback(deltaTime);
            }
            previousTime.current = time;
            previousRequest.current = requestAnimationFrame(animate);
        },
        [...(deps as unknown[]), callback],
    );

    useEffect(() => {
        previousRequest.current = requestAnimationFrame(animate);
        return () => {
            if (previousRequest.current !== undefined)
                cancelAnimationFrame(previousRequest.current);
        };
    }, [animate]);
};

export default useAnimationFrame;
