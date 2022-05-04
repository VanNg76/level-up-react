import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "./GameManager.js"
import { useHistory } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_player} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <p>There are {game.event_count} event(s) for this game</p>
                            <button className="btn icon-edit"
                                onClick={() => {
                                    history.push({ pathname: `/games/${game.id}`})
                            }}>Edit</button>
                            <button className="btn delete-game" onClick={() => 
                                {
                                    deleteGame(game.id)
                                        .then(getGames)
                                        .then(g => setGames(g))
                                }
                            }>DELETE</button>
                        </section>
                    })
                }
            </article>

            
        </>
        )
}
