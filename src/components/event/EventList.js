import { getEvents, leaveEvent, joinEvent } from "./EventManager";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const EventList = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents()
            .then(data => setEvents(data))
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Schedule New Event</button>

            <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__datetime">Happen on {event.date} at {event.time}</div>
                        <div className="event__organizer"> Organized by {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                        <p>There are {event.attendees_count} gamers joined this event</p>
                        <p>Number of attendees: {event.attendees.length} </p>
                        {
                            event.joined ?
                                <button className="btn leave-event" onClick={(e) => {
                                    e.preventDefault()
                                    leaveEvent(event)
                                        .then(getEvents)
                                        .then(e => setEvents(e))
                                }}>Leave Event</button>
                            :
                                <button className="btn join-event" onClick={(e) => {
                                    e.preventDefault()
                                    joinEvent(event)
                                        .then(getEvents)
                                        .then(e => setEvents(e))
                                }}>Join Event</button>
                        }

                        {
                            event.is_organizer ? 
                                <button className="btn icon-edit"
                                    onClick={() => {
                                        history.push({ pathname: `/events/${event.id}`})
                                }}>Edit Event</button>
                            : null
                        }
                    </section>
                })
            }
            </article>
        </>
    )

}