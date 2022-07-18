import React from 'react';

import lib from '@src/lib';

const AsperiteModal = () => {
    return (
        <>
            <div
                style={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    // ...(showNotice && globalStyles.hidden),
                    // position: 'absolute',
                    transition: `all .3s ${lib.layout.animation}`,
                }}
            >
                <div style={{ marginBottom: '.5rem', textAlign: 'center' }} />
            </div>
        </>
    );
};

export default AsperiteModal;
