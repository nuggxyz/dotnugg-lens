const Layout = {
    window: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    header: {
        height: '5rem',
    },
    sideModal: {
        width: '40rem',
    },
    animation: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    smallDeviceWidth: 820,
    borderRadius: {
        small: '.3rem',
        smallish: '.4rem',
        mediumish: '.85rem',
        medium: '1rem',
        largish: '1.5rem',
        large: '2rem',
    },
    boxShadow: {
        basic: '0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01)',
        dark: '0 6px 10px rgba(102, 102, 102,0.4)',
        prefix: '0 6px 10px',
    },
    font: {
        inter: {
            light: 'Inter',
            regular: 'Inter',
            bold: 'Inter-SemiBold',
            semibold: 'Inter-SemiBold',
        },
        montserrat: {
            light: 'Montserrat',
            regular: 'Montserrat',
            bold: 'Montserrat',
            semibold: 'Montserrat',
        },
        code: {
            light: 'SF-Mono',
            regular: 'SF-Mono',
            bold: 'SF-Mono',
            semibold: 'SF-Mono',
        },
    },
    presets: {
        font: {},
    },
};

export default Layout;
