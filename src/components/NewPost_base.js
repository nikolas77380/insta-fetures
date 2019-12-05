import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useForm from "./useForm";


export default function FormDialog({handleData}) {
    const { values, handleChange, handleSubmit } = useForm({title: "", shortDescription: "", description: ""}, fillUp);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

   function fillUp() {
       handleData(values);
       setOpen(false);
   }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create New Post
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            name="title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Short Description"
                            type="text"
                            name="shortDescription"
                            value={values.shortDescription}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            fullWidth
                        />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
