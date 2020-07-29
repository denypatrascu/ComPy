import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@material-ui/core";

const ComPySubmitArea = (props) => {
    const { handleAttachment, accept = ".py" } = props;

    const [files, setFiles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: accept,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: file.name
            })));
        }
    });

    const selectItem = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null)
            handleAttachment([null], 0)
        } else {
            setSelectedIndex(index);
            handleAttachment(files, index);
        }
    };

    const thumbnails = files.map((file, index) => (
        <div key={index} className={(selectedIndex === index ? "item active" : "item")} onClick={
            () => selectItem(index)
        }>
            {file.preview}
        </div>
    ));

    return (
        <section className="submit-area">
            <div className="container">
                <div {...getRootProps({ className: "input" })}>
                    <input {...getInputProps()} />
                    <p>Or drag 'n' drop some <code>.py</code> files here</p>
                    <Button onClick={open}>
                        Select files
                        <span role="img" aria-label="plus">➕</span>
                    </Button>
                </div>
                {files.length > 0 ? (
                    <div className="output">
                        <h1>Select one file</h1>
                        <div className="previews">
                            <div className="carousel">
                                {thumbnails}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default ComPySubmitArea;