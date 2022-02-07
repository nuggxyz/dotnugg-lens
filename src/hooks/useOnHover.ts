import { LegacyRef, RefCallback, useEffect, useRef, useState } from 'react';

const useOnHover = (
    callback?: RefCallback<any>,
): [LegacyRef<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (ref.current) {
            ref.current.onmouseenter = () => setIsHovering(true);
            ref.current.onmouseleave = () => setIsHovering(false);
        }
    }, [ref]);

    useEffect(() => {
        callback && callback(isHovering);
    }, [isHovering, callback]);

    return [ref, isHovering];
};

export default useOnHover;
