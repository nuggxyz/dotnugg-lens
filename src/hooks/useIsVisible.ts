import { useEffect, useRef, useState } from 'react';

const useIsVisible = (
    root = undefined,
    rootMargin = '0px',
    threshold = 0,
): [React.MutableRefObject<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const current = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root,
                rootMargin,
                threshold,
            },
        );
        if (current) {
            observer.observe(current);
        }
        return () => {
            current && observer.unobserve(current);
        };
    }, []);
    return [ref, isVisible];
};

export default useIsVisible;
