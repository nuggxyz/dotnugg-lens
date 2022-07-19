import { RefCallback, useEffect, useRef, useState } from 'react';

import lib from '@src/app/lib';

function useOnScroll(
    callback?: RefCallback<{
        previousScrollTop: number;
        currentScrollTop: number;
    }>,
) {
    const [, setScrollPosition] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    let previousScrollTop = 0;

    function handleDocumentScroll() {
        const { scrollTop: currentScrollTop } =
            ref.current || document.documentElement || document.body;

        setScrollPosition((previousPosition) => {
            previousScrollTop = previousPosition;
            return currentScrollTop;
        });

        if (callback) callback({ previousScrollTop, currentScrollTop });
    }

    const handleDocumentScrollThrottled = lib.lodash.throttle(handleDocumentScroll, 250);

    useEffect(() => {
        const current = ref.current !== undefined && ref.current !== null ? ref.current : document;
        current.addEventListener('scroll', handleDocumentScrollThrottled);

        return () => current.removeEventListener('scroll', handleDocumentScrollThrottled);
        // LOGIC CHANGE
    }, [ref, handleDocumentScrollThrottled]);

    return ref;
}

export default useOnScroll;
