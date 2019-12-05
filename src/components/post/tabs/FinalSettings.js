import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';
import DownshiftMultiple from './../../common/SearchInput';

import useForm from "../../useForm";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing(1),
        width: '100%',
    },
    formWrapper: {
        width: '100%',
        height: '200px',
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

const FinalSettings = () => {
    const classes = useStyles();
    const { values, handleChange, handleSubmit } = useForm({caption: "", tagUsers: [], }, fillUp);

    function fillUp() {
        console.log(values);
    }

    return (
        <div className={classes.formWrapper}>
            <TextField
                id="outlined-multiline-static"
                label="Caption"
                multiline
                rows="4"
                name="caption"
                value={values.caption}
                onChange={handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            <DownshiftMultiple classes={classes} handleChange={handleChange} value={values.tagUsers}/>
        </div>
    )
};

export default FinalSettings;
