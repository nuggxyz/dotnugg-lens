import { useCallback, useState } from 'react';

const useToggle = <T extends string[]>(
    state: T,
    initialState: T[number][],
): [T[number][], (state: T[number]) => void, T] => {
    const [toggled, setToggled] = useState(initialState);

    const toggle = useCallback(
        (state: T[number]) => {
            if (toggled.includes(state)) {
                let temp = [...toggled];
                temp.splice(toggled.indexOf(state), 1);
                setToggled(temp);
            } else {
                setToggled([...toggled, state]);
            }
        },
        [toggled, setToggled],
    );

    return [toggled, toggle, state];
};

export default useToggle;
