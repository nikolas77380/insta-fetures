import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DownshiftMultiple from './../../common/SearchInput';
import {Autocomplete} from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getLocation} from "../../../actions/post";

import useForm from "../../useForm";
import {useDispatch, useSelector} from "react-redux";
import {Paper} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const FinalStep = () => {
    const classes = useStyles();


    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.post.files);
    const locationsData = useSelector(state => state.location.list);
    const loading = useSelector(state => state.location.loading);
    console.log(loading)
    const [inputValue, setInputValue] = React.useState({});

    const [dimentions, setDimentions] = useState({width:0, height: 0});
    let image = '';

    const { values, handleChange, handleSubmit } = useForm({caption: "", tagUsers: [], }, fillUp);

    useEffect(() => {
        let active = true;

        image = document.createElement('img');
        image.setAttribute('id','filterImage');
        image.src = reduxData[0];
        setDimentions({
            width:image.width,
            height: image.height
        });

    },[]);

    function fillUp() {
        console.log(values);
    }

    const handleSearchLocation = (event) => {
        console.log('handle search')
        setInputValue( event.target.value );
        dispatch(getLocation(event.target.value));
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

            <TextField
                value={inputValue.name}
                onChange={handleSearchLocation}
                fullWidth
                label="Add Location"
                className={classes.textField}
            />
            {locationsData.length !== 0 &&
                <Paper style={{height:'100px', width:'100%', overflowY:'scroll', marginTop:'10px'}}>
                    {locationsData.map(location => (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOnIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs>
                                <Button onClick={() => setInputValue(location)}>
                                    <Typography>{location.name}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
            }
            {loading &&
                <CircularProgress disableShrink />
            }
        </div>
    )
};

export default FinalStep;
