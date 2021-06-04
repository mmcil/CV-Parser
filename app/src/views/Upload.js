import React from "react";
import axios from 'axios';
import {useState} from "react";

function Upload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:5000/pdf-upload",
                formData
            );
            alert("Resume has uploaded successfully!")
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="Upload">
            <input className="chooseFile" type="file" onChange={saveFile}/>
            <button className="contentButton" onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default Upload;