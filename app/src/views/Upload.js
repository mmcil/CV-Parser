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
            <input type="file" onChange={saveFile}/>
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
}

export default Upload;

// class Upload extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null
//         }
//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.fileUpload = this.fileUpload.bind(this)
//     }
//
//     onFormSubmit(e) {
//         e.preventDefault() // Stop form submit
//         this.fileUpload(this.state.file).then((response) => {
//             console.log(response.data);
//         })
//     }
//
//     onChange(e) {
//         this.setState({file: e.target.files[0]})
//     }
//
//     fileUpload(file) {
//         const url = 'http://example.com/file-upload';
//         const formData = new FormData();
//         formData.append('file', file)
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }
//         return post(url, formData, config)
//     }
//
//     render() {
//         return (
//
//             <div className="wrapper">
//                 <div className="container">
//                     <h1>Upload a file</h1>
//                     <div className="upload-container">
//                         <div className="border-container">
//                             <div className="icons fa-4x">
//                                 <i className="fas fa-file-image"
//                                    data-fa-transform="shrink-3 down-2 left-6 rotate--45"/>
//                                 <i className="fas fa-file-alt"
//                                    data-fa-transform="shrink-2 up-4"/>
//                                 <i className="fas fa-file-pdf"
//                                    data-fa-transform="shrink-3 down-2 right-6 rotate-45"/>
//                             </div>
//                             <p>Drag and drop files here, or
//                                 <a href="#" id="file-browser">browse</a> your
//                                 computer.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
// /*        <form onSubmit={this.onFormSubmit}>
//             <h1>File Upload</h1>
//             <input type="file" onChange={this.onChange}/>
//             <button type="submit">Upload</button>
//         </form>*/
//     )
//     }
// }
//
// export default Upload;
