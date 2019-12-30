import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import Calendar from "react-big-calendar";
import moment from "moment";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "../customizations/calendar-style.css";
import List from '@material-ui/core/List';
import SinglePost  from "../components/common/SinglePost";
import NewPost from "../components/post";
import {getPosts, schedulePost} from './../actions/post';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import CalendarItem from "../components/common/CalendarItem";
import CircularProgress from '@material-ui/core/CircularProgress';

const localizer = Calendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar, {backend: false});


const RenderEventList = ({filter, events}) => {
    let filteredEvents;
    switch(filter){
            case 'used': {
                filteredEvents = events.filter(event => event.date_posting);
                break;
            }
            case 'unused' : {
                filteredEvents = events.filter(event => !event.date_posting);
                break;
            }
            case '' : {
                filteredEvents = events;
                break;
            }
    }
    return (
        <List>
            {filteredEvents.map(event => <SinglePost key={event.id} event={event} />)}
        </List>
    )
};

class SchedulerPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = { filter: "" }
        this.onEventDrop = this.onEventDrop.bind(this)
    }

    componentDidMount() {
        this.props.getPosts();
    }

    onEventDrop ({event, start, end}) {
        let updatedEvent = {...event, start, end}
        this.props.schedulePost(updatedEvent);
    }

    handleChange = (event) => {
        const filter = event.target.value;
        this.setState({filter});
    };

    render() {
        const {customEvents, loading} = this.props;
        const { filter } = this.state;
        const events = customEvents.map(event =>  {
            return {
                ...event,
                start: new Date(event.date_posting),
                end: new Date(moment(event.date_posting).add('1', 'hours'))
            }
        });
        return (
            <Grid container style={{paddingTop: '20px'}}>
                <Grid item xs={3}>
                    <NewPost />
                    <FormControl style={{paddingLeft: '50px'}}>
                        <NativeSelect
                            value={this.state.filter}
                            onChange={this.handleChange}
                            name="filter"
                            inputProps={{ 'aria-label': 'filter' }}
                        >
                            <option value="">all</option>
                            <option value='used'>Used</option>
                            <option value='unused'>Unused</option>
                        </NativeSelect>
                    </FormControl>
                    <RenderEventList filter={filter} events={customEvents}/>
                </Grid>
                <Grid item xs={9}>
                    <div style={{height: 500}} >
                        {loading &&
                        <div style={{
                            position: 'fixed',
                            zIndex: 100,
                            left: '60%',
                            top: '50%',
                            width: '100px',
                            height: '100px'
                        }}>
                            <CircularProgress size={60}/>
                        </div>
                        }
                    <DnDCalendar
                        defaultDate={new Date()}
                        defaultView="week"
                        views={['week','day']}
                        events={events}
                        components={{
                            event: CalendarItem
                        }}
                        localizer={localizer}
                        onEventDrop={this.onEventDrop}
                        style={{ height: "100vh", padding:'10px'}}
                    />
                    </div>
                </Grid>
            </Grid>
        );
    }

}

const mapStateToProps = state => {
    return {
        customEvents: state.post.list,
        loading: state.post.loading
    }
};

SchedulerPage.defaultProps = {
    events: [],
    customEvents: []
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, {getPosts, schedulePost})(SchedulerPage));
