import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/HighlightOff';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Paper} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getLocation, clearLocation} from "../../../actions/post";
import useDebounce from "../../useDebounce";
import HashtagModal from "../../common/HashtagModal";

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
    locationsBlock: {
        height:'100px',
        width:'100%',
        overflowY:'scroll',
        marginTop:'10px'
    },
    progressWrapper: {
        width: '100%',
        '& > * + *': {
            marginTop: '10px',
        },
    }
}));

const FinalStep = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.post.files);
    const locationsData = useSelector(state => state.location.list);
    const loading = useSelector(state => state.location.loading);

    const [inputValue, setInputValue] = useState('');
    const [location, setLocation] = useState({});
    const [locationSelected, setLocationSelected] = useState(false);
    const [caption, setCaption] = useState('');
    const [dimentions, setDimentions] = useState({ width:0, height: 0 });
    const [openHashtagModal, setHashtagModal] = useState(false);

    const debouncedSearch = useDebounce(inputValue, 800);
    let image = '';

    useEffect(() => {
        if (debouncedSearch && debouncedSearch.length > 0 && !locationSelected && inputValue) {
            dispatch(getLocation(debouncedSearch));
        }
        if (debouncedSearch.length === 0) {
            dispatch(clearLocation());
        }
        image = document.createElement('img');
        image.setAttribute('id','filterImage');
        image.src = reduxData[0];
        setDimentions({
            width:image.width,
            height: image.height
        });
    },[debouncedSearch, locationSelected]);

    const handleSearchLocation = (event) => {
        setInputValue( event.target.value );
    };

    const handleChangeCaption = (event) => {
        let caption = event.target.value;
        const lastElement = caption[caption.length-1];
        if(lastElement === '#') {
            setHashtagModal(true);
        }
        setCaption(caption)
    };

    const handleUpdateCaption = (hashtag) => {
        let newCaption = caption.split('');
        newCaption.pop();
        setCaption(newCaption.join('')+hashtag);
        setHashtagModal(false);
    };

    const handleSetLocation = (location) => {
        if(!location) {
            setInputValue('');
            setLocation({});
            setLocationSelected(false)
        } else {
            setInputValue(location.name);
            setLocation(location);
            setLocationSelected(true)
        }
        dispatch(clearLocation());
    }

    return (
        <div className={classes.formWrapper}>
            <TextField
                id="outlined-multiline-static"
                label="Caption"
                multiline
                rows="4"
                name="caption"
                value={caption}
                onChange={handleChangeCaption}
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
            <HashtagModal open={openHashtagModal} chooseHashtag={(hashtag) => handleUpdateCaption(hashtag)}/>

            <div style={{display:'flex', justifyContent:'space-around'}}>
                <TextField
                    value={inputValue}
                    onChange={handleSearchLocation}
                    fullWidth
                    label="Add Location"
                    className={classes.textField}
                />
                {inputValue && <Button onClick={() => handleSetLocation('')}><ClearIcon/></Button>}
            </div>

            {locationsData.length !== 0 &&
                <Paper className={classes.locationsBlock}>
                    {locationsData.map(location => (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOnIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs>
                                <Button onClick={() => handleSetLocation(location)}>
                                    <Typography>{location.name}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
            }
            {loading &&
                <div className={classes.progressWrapper}>
                    <LinearProgress variant="query" />
                </div>
            }
        </div>
    )
};

export default FinalStep;
