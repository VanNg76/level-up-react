import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { EditEventForm } from "./event/EditEventForm"
import { EditGameForm } from "./game/EditGameForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
                <EditEventForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <EditGameForm />
            </Route>
        </main>
    </>
}