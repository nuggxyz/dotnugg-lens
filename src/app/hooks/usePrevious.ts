import { useEffect, useRef } from 'react';

// modified from https://usehooks.com/usePrevious/
const usePrevious = <T>(value: T) => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevious;
