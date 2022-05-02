import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getGameById, saveEditGame, getGameTypes } from "./GameManager"
import { useHistory } from "react-router-dom"


export const EditGameForm = () => {
    const { gameId } = useParams()
    const [editGame, setEditGame] = useState({})
    const [gameTypes, setGameTypes] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            if (gameId) {
                getGameById(parseInt(gameId))
                    .then(g => setEditGame(g))
            }
    }, [gameId])
            
    useEffect(() => {
        getGameTypes()
            .then(gt => setGameTypes(gt))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...editGame}      // Create a copy
        copy[domEvent.target.name] = domEvent.target.value   // Modify copy
        setEditGame(copy)     // Set copy as new state
    }

    return (
        <form className="editGameForm">
            <h2 className="editGameForm">Edit Game Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={editGame.title}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={editGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_player">Number of Players: </label>
                    <input type="number" name="number_of_player" required autoFocus className="form-control"
                        value={editGame.number_of_player}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={editGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="game_type" className="form-control" onChange={changeGameState}>
                        <option value="0">Select game type</option>
                        {gameTypes?.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        skill_level: parseInt(editGame.skill_level),
                        number_of_player: parseInt(editGame.number_of_player),
                        title: editGame.title,
                        maker: editGame.maker,
                        game_type: editGame.game_type
                    }

                    // Send POST request to your API
                    saveEditGame(gameId, game)
                        .then(() => history.push("/games"))
                }}>Done</button>
        </form>
    )
}
