import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@material-ui/core/Button';
import {Paper} from "@material-ui/core";

class ImageCropper extends Component {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 4 / 5,
        },
        croppedImageUrl: {},
        showCrop: false
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, showCrop: true })
            );
            this.props.resetCrop();
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }
    handleChangeAspect = (x, y) => {
            this.setState({
                ...this.state,
                crop: {
                    ...this.state.crop,
                    aspect: x / y
                }
            })
    }

    applyChanges = () => {
        this.setState({
            showCrop: false
        })
        this.props.applyImage(this.state.croppedImageUrl);
    }

    render() {
        const { crop, croppedImageUrl, src, showCrop } = this.state;

        return (
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.onSelectFile} />
                </div>
                {src && showCrop && (
                    <>
                        <Paper style={{margin: '10px', padding:'10px'}}>
                            <b>Choose Direction</b>
                            <Button onClick={() => this.handleChangeAspect(1.91, 1)}><Paper style={{width:'50px', height:'20px'}}></Paper></Button>
                            <Button onClick={() => this.handleChangeAspect(4, 5)}><Paper style={{width:'20px', height:'50px'}}></Paper></Button>
                        </Paper>
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    </>
                )}
                {croppedImageUrl && showCrop && (
                    <div>
                        <Button variant="contained" color="primary" onClick={this.applyChanges}>Apply</Button>
                    </div>
                )}
            </div>
        );
    }
}

export default ImageCropper;
