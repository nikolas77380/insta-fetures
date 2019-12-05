import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDropzone} from 'react-dropzone';
import {setFiles} from './../../../actions/post';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    flexWrap: 'wrap',
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 1,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 300,
    padding: 2,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 200,
    height: '100%'
};


function UploadStep(props) {
    const reduxData = useSelector(state => state.post.files);
    const data = reduxData ? reduxData : [];
    const dispatch = useDispatch();
    const [files, setLocalFiles] = useState(data);

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            dispatch(setFiles(acceptedFiles));
            setLocalFiles(acceptedFiles);

        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={URL.createObjectURL(file)}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})} style={{cursor:'pointer'}}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

export default UploadStep;
