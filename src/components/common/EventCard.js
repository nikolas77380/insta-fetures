import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: '10px'
    },
    details: {
        display: 'flex',
            flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    calendarItem: {
        width: 50,
        height: 50
    }
}));

const EventCard = ({event}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={event.image}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {event.caption}
                    </Typography>
                </CardContent>
            </div>

        </Card>
    )
};

export default EventCard;
