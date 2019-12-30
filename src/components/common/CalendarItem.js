import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    calendarItem: {
        width: 50,
        height: 50
    }
}));

const CalendarItem = ({event}) => {
    const classes = useStyles();
        return  <img src={event.image} alt={event.caption} className={classes.calendarItem}/>
};

export default CalendarItem;
