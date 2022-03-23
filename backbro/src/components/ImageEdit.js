import Axios from 'axios';
import { useState } from 'react';
import { config } from '../Constants'; 

function ImageEdit({ id, image, alt, images, setImages, ext }) {
    const [visible, setVisible] = useState(true);
    Axios.defaults.withCredentials = true;
    const onDelete = async (e) => {
        const url = ext ? `objekt/${id}.${ext}` : `lagenhet/${id}`;
        await Axios.delete(`${config.url.DB_URL}/api/upload/${url}`, { data: { image: image } });
        e.target.parentNode.classList.add("out");
        setTimeout(() => {
            setVisible(false);
            images = images.filter(name => name !== image);
            setImages(images);
        }, 600);
    }
    return (
        <div className="image-wrapper">
            {visible && (
            <div>
                { ext ? <img src={`${config.url.DB_URL}/objekt/${id}.${ext}`} alt={alt} className='edit-bild'/>
                : (
                    <>
                        <img src={`${config.url.DB_URL}/lagenhet/${id}/${image}`} alt={alt} className='edit-bild'/>
                        <span className="del-image" onClick={onDelete}></span> 
                    </>
                )}
            </div> )}
        </div>
    );
}

export default ImageEdit;