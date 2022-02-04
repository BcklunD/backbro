import { useState } from 'react';
import Axios from 'axios';
 
const FileUpload = ({lopnr}) => {
 
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    Axios.defaults.withCredentials = true;
 
    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("lopnr", lopnr);
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await Axios.post("http://localhost:3002/api/upload", formData);
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}
 
export default FileUpload;