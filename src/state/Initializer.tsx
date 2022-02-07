import React, { FunctionComponent, ReactChild } from 'react';

import { states } from './store';

type Props = {
    children: ReactChild | ReactChild[];
};

const Initializer: FunctionComponent<Props> = ({ children }) => (
    <>
        {Object.values(states).map((state, index) => (
            <state.updater key={index} />
        ))}
        {children}
    </>
);

export default Initializer;
