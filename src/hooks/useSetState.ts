import React, { useEffect, useState } from 'react';

const useSetState = <T>(func: () => T, deps: React.DependencyList, initialValue?: T) => {
    const [result, setResult] = useState<T | undefined>(initialValue);

    useEffect(() => {
        setResult(func());
    }, deps);

    return result;
};

export default useSetState;
