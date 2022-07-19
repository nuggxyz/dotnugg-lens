import type * as CSS from 'csstype';
import type * as React from 'react';

export type { CSS, React };

declare module 'csstype' {
    // https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
    interface Properties {
        // Add a CSS Custom Property
        '--dotnugg-stroke-width'?: number;
        '--info-clicker-filter'?: string;
        '--a'?: string;
        '--b'?: string;
        '--c'?: string;
        '--d'?: string;
        '--e'?: string;
        '--f'?: string;
        '--i'?: number;
        '--p'?: string;
        '--pn'?: number;

        '--r'?: string;
    }
}

declare module 'react' {
    // https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
    interface CSSProperties {
        // Add a CSS Custom Property
        '--dotnugg-stroke-width'?: number;
        '--info-clicker-filter'?: string;
        '--a'?: string;
        '--b'?: string;
        '--c'?: string;
        '--d'?: string;
        '--e'?: string;
        '--f'?: string;
        '--i'?: number;
        '--p'?: string;
        '--pn'?: number;

        '--r'?: string;
    }

    type FCC<T> = FunctionComponent<PropsWithChildren<T>>;
}

// declare interface CSSPropertiesWithVars extends React.CSSProperties {
//     '--dotnugg-stroke-width'?: number;
//     '--info-clicker-filter'?: string;
// }
