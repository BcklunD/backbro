import { useState } from 'react';
import Axios from 'axios';
import { config } from '../Constants'; 
Axios.defaults.withCredentials = true;
 
const FileUpload = ({lopnr, forceUpdate, images, setImages, type, setReload}) => {
 
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        try {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } catch (ex) {
            return;
        }
    };
 
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        let path = `${config.url.DB_URL}/api/upload/`;
        if (type === "objekt") {
            path += `objekt/${lopnr}`;
            try {
                await Axios.post(path, formData);
                setReload(true);
                window.location.reload();
            } catch (ex) {
                console.log(ex);
            }
        }
        else {
            path += `lagenhet/${lopnr}`;
            try {
                await Axios.post(path, formData);
                images.push(fileName)
                setImages(images);
                forceUpdate();
            } catch (ex) {
                console.log(ex);
            }
        }
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={saveFile} />
            <button className="btn btn-info" onClick={uploadFile}>Ladda upp</button>
        </div>
    );
}
 
export default FileUpload;