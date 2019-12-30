import React, {useState} from 'react';
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
    const [localSettings, updateLocalSettings] = useState({});

    const handleUpdateLocal = (type, value) => {
        updateLocalSettings({
            ...localSettings,
            [type]: value
        })
    }

    return (
        <>
            <Typography gutterBottom>Fade</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleUpdateLocal('fade', value)}
                onChangeCommitted={(event, value) => handleChange('fade', value) }
                step={0.05}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                aria-label="Fade"
                value={localSettings['fade'] || settings['fade']}
            />
            <Typography gutterBottom>Contrast</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleUpdateLocal('contrast', value)}
                onChangeCommitted={(event, value) => handleChange('contrast', value) }
                step={0.05}
                max={1}
                min={-1}
                valueLabelDisplay="auto"
                aria-label="Contrast"
                value={localSettings['contrast'] || settings['contrast']}
            />
            <Typography gutterBottom>Brightness</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleUpdateLocal('brightness', value)}
                onChangeCommitted={(event, value) => handleChange('brightness', value) }
                step={0.05}
                max={1}
                min={-1}
                valueLabelDisplay="auto"
                aria-label="Brightness"
                value={localSettings['brightness']|| settings['brightness']}
            />
            <Typography gutterBottom>Opacity</Typography>
            <PrettoSlider
                disabled={settings.filter !== ''}
                onChange={(event, value) => handleUpdateLocal('opacity', value)}
                onChangeCommitted={(event, value) => handleChange('opacity', value) }
                step={0.05}
                max={1}
                min={0}
                valueLabelDisplay="auto"
                aria-label="Opacity"
                value={localSettings['opacity']|| settings['opacity']}
            />
        </>
    )
}

export default EditTab;
