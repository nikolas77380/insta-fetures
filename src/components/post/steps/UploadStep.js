import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setFiles} from './../../../actions/post';
import ImageCropper from "../../common/ImageCropper";
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    flexWrap: 'wrap',
};

const thumb = {
    display: 'flex',
    justifyContent:'center',
    border: 0,
    borderRadius: 1,
    marginBottom: 8,
    marginRight: 8,
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
    width: '100%',
    height: '100%'
};


function UploadStep(props) {
    const reduxData = useSelector(state => state.post.files);
    const data = reduxData ? reduxData : [];
    const dispatch = useDispatch();
    const [files, setLocalFiles] = useState(data);

    const applyImage = (file) => {
        dispatch(setFiles([file]));
        setLocalFiles([file]);
    }

    const thumbs = files.map(file => (
        <div style={thumb} key={file}>
            <div style={thumbInner}>
                <img
                    src={file}
                    style={img}
                />
            </div>
        </div>
    ));
    const resetCrop = () => {
        setLocalFiles([]);
    }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <>
            <ImageCropper applyImage={(file) => applyImage(file)} resetCrop={resetCrop}/>
            {thumbs}
        </>
    );
}

export default UploadStep;
