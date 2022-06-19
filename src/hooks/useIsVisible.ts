import { useEffect, useRef, useState } from 'react';

const useIsVisible = (
    root: HTMLElement | null,
    rootMargin = '0px',
    threshold = 0,
): [React.RefObject<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const { current } = ref;
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
            if (current) observer.unobserve(current);
        };
    }, []);
    return [ref, isVisible];
};

export default useIsVisible;
