import React, {Component} from "react";
import axios, {post} from 'axios';
import {useState} from "react";

function Upload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:5000/pdf-upload",
                formData
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className="Upload">
            <input className="chooseFile" type="file" onChange={saveFile}/>
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default Upload;