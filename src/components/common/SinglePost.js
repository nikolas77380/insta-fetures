import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import {withStyles} from "@material-ui/core";
import BigCalendar from 'react-big-calendar'
import EventCard from "./EventCard";

const styles = theme => ({
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
    }
});

/* drag sources */
let eventSource = {
    beginDrag(props) {
        return Object.assign({},
            {event: props.event},

            {anchor: 'drop'}
        )
    }
}

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    event: PropTypes.object.isRequired
}



class DraggableSidebarEvent extends Component {
    render() {
        let {connectDragSource, isDragging, event, classes} = this.props;
        const EventWrapper =  BigCalendar.components.eventWrapper;

        return (
            <EventWrapper event={event} >
                {connectDragSource(<div style={{opacity: isDragging ? 0.8 : 1}}>
                    <EventCard event={event}/>
                </div>)}
            </EventWrapper>

        );
    }
}

DraggableSidebarEvent.propTypes = propTypes;


export default DragSource('event', eventSource, collectSource)(withStyles(styles)(DraggableSidebarEvent));
