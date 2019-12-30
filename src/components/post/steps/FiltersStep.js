import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import EditTab from "../tabs/EditTab";
import FiltersTab from "../tabs/FiltersTab";

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ProcessImage from 'react-imgpro';

import {setDownloadFile} from './../../../actions/post';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    flexWrap: 'wrap',
    padding:10
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 1,
    border: '1px solid #eaeaea',
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function FilterStep(props) {
    const defaultSettings = {
        contrast: 0,
        fade: 0.5,
        brightness: 0,
        opacity: 0.5,
        // blur: 50,
        filter: ''
    };
    const classes = useStyles();
    const reduxData = useSelector(state => state.post.files);
    const dispatch = useDispatch();
    const [settings, setSettings] = useState(defaultSettings);
    const [tab, setTab] = React.useState(0);
    const [dimentions, setDimentions] = useState({width:0, height: 0});
    const [updatedImage, updateImage] = useState({})
    let image = '';

    useEffect(() => {
        image = document.createElement('img');
        image.setAttribute('id','filterImage');
        image.src = reduxData[0];
        setDimentions({
            width:image.width,
            height: image.height
        });
    },[]);
    const handleChange = (type, value) => {
        setSettings({
            ...settings, [type]: value
        });
    }

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    const resetSettings = () => {
        setSettings(defaultSettings);
    }

    const applyChangesToImage = (src, err) => {
        dispatch(setDownloadFile(src))
        updateImage({src, err})
    }

    return (
        <section className="container">
            <div style={thumbsContainer}>
                <div className={classes.thumb}>
                    <ProcessImage
                        brightness={settings.brightness}
                        contrast={settings.contrast}
                        fade={settings.fade}
                        opacity={settings.opacity}
                        quality={95}
                        image={ reduxData[0] }
                        resize={{ width: dimentions.width, height: dimentions.height }}
                        processedImage={(src, err) => applyChangesToImage( src, err )}
                    />
                </div>
                <div style={{width:'80%'}}>
                    <div  style={{display:'flex', justifyContent:'flex-end', marginBottom: '10px'}}>
                        <Button variant='outlined' onClick={() => resetSettings()}>
                            Reset
                        </Button>
                    </div>
                    <Paper className={classes.root}>
                        <Tabs
                            value={tab}
                            onChange={handleChangeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Edit" {...a11yProps(1)}/>
                            <Tab label="Filters" {...a11yProps(0)}/>
                        </Tabs>
                    </Paper>
                    <TabPanel style={{maxHeight:'150px', overflowY: 'scroll'}} value={tab} index={1}>
                        <FiltersTab handleChange={(type, value) => handleChange(type, value)}/>
                    </TabPanel>
                    <TabPanel style={{maxHeight:'150px', overflowY: 'scroll'}} value={tab} index={0}>
                        <EditTab settings={settings} handleChange={(type, value) => handleChange(type, value)}/>
                    </TabPanel>
                </div>
            </div>
        </section>
    );
}

export default FilterStep;
