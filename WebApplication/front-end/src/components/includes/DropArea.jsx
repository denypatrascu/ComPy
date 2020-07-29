import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@material-ui/core";

const ComPyDropArea = (props) => {
    const { handleAttachment, accept = "image/*" } = props;

    const [files, setFiles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: accept,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    useEffect(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files, selectedIndex]);

    const selectItem = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null)
        } else {
            setSelectedIndex(index);
            handleAttachment(files, index);
        }
    };

    const thumbnails = files.map((file, index) => (
        <div key={index} className={(selectedIndex === index ? "item active" : "item")} onClick={
            () => selectItem(index)
        }>
            <img src={file.preview} alt={file.name} />
        </div>
    ));

    return (
        <section className="drop-area">
            <div className="container">
                <div {...getRootProps({ className: "input" })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here</p>
                    <Button onClick={open}>
                        Select files
                        <span role="img" aria-label="plus">➕</span>
                    </Button>
                </div>
                {files.length > 0 ? (
                    <div className="output">
                        <h1>Select one Image</h1>
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

export default ComPyDropArea;