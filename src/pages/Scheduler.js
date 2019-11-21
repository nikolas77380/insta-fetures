import React from 'react';
import Grid from '@material-ui/core/Grid';

import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "../customizations/calendar-style.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AvatarImg from './../placeholder.jpeg';

import NewPost from "../components/NewPost";

const localizer = Calendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class SchedulerPage extends React.Component {

    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "hours")),
                title: "First Post",
                isArchived: false
            },
            {
                start: new Date(),
                end: new Date(moment().add(1, "hours")),
                title: "Other Post",
                shortDescription: "this is shord description...",
                description: "Here must be some description of post",
                isArchived: false
            },
            {
                start: new Date(),
                end: new Date(moment().add(1, "hours")),
                title: "Third Post",
                shortDescription: "this is shord description...",
                description: "Here must be some description of post",
                isArchived: true
            }
        ]
    };

    onEventResize = ({ event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };
    handlePostData = ({title, description, shortDescription}) => {
        this.setState({
            ...this.state,
            events: [...this.state.events, {
                start: new Date(),
                end: new Date(moment().add(1, "hours")),
                title,
                shortDescription,
                description,
                isArchived: true
            }]
        });

    }
    onCreateEvent = () => {
        // open popup with fields
        // after save - add events list with archived true
    }

    render() {
        return (
            <Grid container style={{paddingTop: '20px'}}>
                <Grid item xs={3}>
                    <NewPost handleData={this.handlePostData}/>
                    <List>
                    {this.state.events.filter(event => event.isArchived).map(el => {
                        return (<React.Fragment key={el.title}>
                                <ListItem alignItems="flex-start" >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={AvatarImg} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={el.title}
                                        secondary={
                                            <React.Fragment>
                                                {el.shortDescription}<br/>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    Scheduled on : {moment(el.start).format('LLLL')}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                </React.Fragment>
                        )
                    })}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <DnDCalendar
                        defaultDate={new Date()}
                        defaultView="month"
                        events={this.state.events.filter(event => !event.isArchived)}
                        localizer={localizer}
                        onEventDrop={this.onEventDrop}
                        onEventResize={this.onEventResize}
                        resizable
                        style={{ height: "100vh", padding:'10px' }}
                    />
                </Grid>
            </Grid>
        );
    }

}

export default SchedulerPage;
