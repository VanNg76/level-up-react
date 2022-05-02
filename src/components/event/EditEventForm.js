import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getEventById, saveEditEvent } from "./EventManager"
import { getGames } from "../game/GameManager"
import { useHistory } from "react-router-dom"


export const EditEventForm = () => {
    const { eventId } = useParams()
    const [editEvent, setEditEvent] = useState({})
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            if (eventId) {
                getEventById(parseInt(eventId))
                    .then(e => setEditEvent(e))
            }
    }, [eventId])
            
    useEffect(() => {
        getGames()
            .then(g => setGames(g))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...editEvent}      // Create a copy
        /* if name=game, return a whole game-obj else do 1 line below code*/
        
        copy[domEvent.target.name] = domEvent.target.value   // Modify copy
        setEditEvent(copy)     // Set copy as new state
    }

    return (
        <form className="editEventForm">
            <h2 className="editEventForm">Edit Event Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        value={editEvent.description}
                        onChange={changeEventState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={editEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of event: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={editEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="game" className="form-control" onChange={changeEventState}>
                        <option value="0">Select game</option>
                        {games?.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: editEvent.description,
                        date: editEvent.date,
                        time: editEvent.time,
                        game: parseInt(editEvent.game)
                    }

                    // Send POST request to your API
                    saveEditEvent(eventId, event)
                        .then(() => history.push("/events"))
                }}>Done</button>
        </form>
    )
}
