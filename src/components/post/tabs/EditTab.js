import React from 'react';
import {withStyles} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const PrettoSlider = withStyles({
    root: {
        color: '#e91e63',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


const EditTab = ({settings, handleChange}) => {
    return (
        <>
            <Typography gutterBottom>Contrast</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleChange('contrast', value) }
                step={0.05}
                max={2}
                min={0}
                valueLabelDisplay="auto"
                aria-label="Contrast"
                value={settings['contrast']}
            />
            <Typography gutterBottom>Saturation</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleChange('saturation', value) }
                step={0.05}
                max={2}
                min={0}
                valueLabelDisplay="auto"
                aria-label="Contrast"
                value={settings['saturation']}
            />
            <Typography gutterBottom>Brightness</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleChange('brightness', value) }
                step={0.05}
                max={2}
                min={0}
                valueLabelDisplay="auto"
                aria-label="Contrast"
                value={settings['brightness']}
            />
        </>
    )
}

export default EditTab;
