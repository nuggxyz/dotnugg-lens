/* eslint-disable no-param-reassign */
import React from 'react';
import create from 'zustand';
import { combine } from 'zustand/middleware';

const useStore = create(
    combine(
        {
            height: window.innerHeight,
            width: window.innerWidth,
        },
        (set) => {
            const update = () => {
                set(() => {
                    return {
                        height: window.innerHeight,
                        width: window.innerWidth,
                    };
                });
            };

            return { update };
        },
    ),
);

export const useUpdateDimensions = () => {
    const update = useStore((data) => data.update);

    const resizer = React.useCallback(update, [update]);

    React.useEffect(() => {
        update();
        window.addEventListener('resize', resizer);
        return () => {
            window.removeEventListener('resize', resizer);
        };
    }, [resizer, update]);

    // console.log({ innerHeight, innerWidth });

    return null;
};

export default {
    useDimensions: () => useStore((data) => data),
};
