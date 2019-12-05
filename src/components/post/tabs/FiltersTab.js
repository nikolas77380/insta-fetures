import React from 'react';
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import { filterTypes } from "./../../../helpers/filters";
import Shaders from './../../../filters/shaders';
import Uniforms from "../../../filters/uniforms";
import {Node} from "gl-react";
import {Surface} from "gl-react-dom";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 200,
        height: 200,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const Saturate = ({
                      filter,
                      contrast,
                      saturation,
                      brightness,
                      children
}) => {

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
};

const FiltersTab = ({handleChange}) => {
    const classes = useStyles();
    const reduxData = useSelector(state => state.post.files);
    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                </GridListTile>
                {filterTypes.map(filter => {
                    const settings = { filter };
                    return (
                        <GridListTile key={filter}>
                            <Button onClick={() => handleChange('filter', filter)}>
                            <Surface width={100} height={100}>
                                <Saturate {...settings}>
                                    { URL.createObjectURL(reduxData[0])}
                                </Saturate>
                            </Surface>
                            </Button>
                        </GridListTile>
                    )
                })}
            </GridList>
        </div>
    )
};

export default FiltersTab;
