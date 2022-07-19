import React, { FunctionComponent } from 'react';

type Props = {
    src: any;
    style?: React.CSSProperties;
    alt?: string;
};

const Image: FunctionComponent<Props> = ({ src, style, alt }) => {
    return <img src={src} style={style} alt={alt} />;
};

export default Image;
