import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import EditTab from "../tabs/EditTab";
import FiltersTab from "../tabs/FiltersTab";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Node } from "gl-react";
import { Surface } from "gl-react-dom";
import {setFiles} from './../../../actions/post';

// Filter for images
import Shaders from './../../../filters/shaders';
import Uniforms from "../../../filters/uniforms";

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

const Saturate = ({ filter, contrast, saturation, brightness, children }) => {
    let uniforms, currentShaders;
    if (filter) {
        currentShaders = Shaders[filter];
        uniforms = Uniforms(filter, children);
    } else {
        currentShaders = Shaders.Saturate;
        uniforms = {
            contrast, saturation, brightness, t: children
        }
    }

    return (
        <Node
            shader={currentShaders}
            uniforms={uniforms}
        />)
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function FilterStep(props) {
    const defaultSettings = {
        contrast: 1,
        saturation: 1,
        brightness: 1,
        filter: ''
    }
    const classes = useStyles();
    const reduxData = useSelector(state => state.post.files);
    const [settings, setSettings] = useState(defaultSettings);
    const [tab, setTab] = React.useState(0);

    let preview = '';

    useEffect(() => {
        const data = reduxData ? reduxData : [];
        preview = URL.createObjectURL(data[0]);
    },[])

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


    return (
        <section className="container">
            <div style={thumbsContainer}>
                <div style={thumb}>
                    <div style={thumbInner}>
                        <Surface width={200} height={300}>
                            <Saturate {...settings}>
                                { URL.createObjectURL(reduxData[0])}
                            </Saturate>
                        </Surface>
                    </div>
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
                            <Tab label="Filters" {...a11yProps(0)}/>
                            <Tab label="Edit" {...a11yProps(1)}/>
                        </Tabs>
                    </Paper>
                    <TabPanel style={{maxHeight:'130px', overflowY: 'scroll'}} value={tab} index={0}>
                        <FiltersTab handleChange={(type, value) => handleChange(type, value)}/>
                    </TabPanel>
                    <TabPanel style={{maxHeight:'130px', overflowY: 'scroll'}} value={tab} index={1}>
                        <EditTab settings={settings} handleChange={(type, value) => handleChange(type, value)}/>
                    </TabPanel>


                </div>
            </div>
        </section>
    );
}

export default FilterStep;
