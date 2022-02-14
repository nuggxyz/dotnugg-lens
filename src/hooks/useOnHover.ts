import { LegacyRef, RefCallback, useEffect, useRef, useState } from 'react';

const useOnHover = (
    callback?: RefCallback<any>,
): [LegacyRef<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const current = ref.current;
            const enter = () => setIsHovering(true);
            const leave = () => setIsHovering(false);
            current.onmouseenter = () => setIsHovering(true);
            current.onmousemove = () => setIsHovering(true);
            current.onmouseover = () => setIsHovering(true);
            current.onmouseleave = () => setIsHovering(false);
            current.addEventListener('mouseenter', enter);
            current.addEventListener('mouseover', enter);
            current.addEventListener('mousemove', enter);
            current.addEventListener('mouseleave', leave);
            return () => {
                current.removeEventListener('mouseenter', enter);
                current.removeEventListener('mouseover', enter);
                current.removeEventListener('mousemove', enter);
                current.removeEventListener('mouseleave', leave);
            };
        } else {
            setIsHovering(false);
        }
    }, [ref]);

    useEffect(() => {
        callback && callback(isHovering);
    }, [isHovering, callback]);

    return [ref, isHovering];
};

export default useOnHover;
