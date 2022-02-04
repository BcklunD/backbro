import { useState } from 'react';

const Image = ({data}) => {
    const [src, setSrc] = useState();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data)));
    setSrc(`data:image/png;base64,${base64String}`);
    console.log(base64String)

    return (
        <img src={src} alt='lagenhetsbild' />
    );
}

export default Image;
