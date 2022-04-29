import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_player: 0,
        title: "",
        maker: "",
        game_type_id: 0
    })

    useEffect(() => {
        getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = Object.assign({}, currentGame)      // Create a copy
        if (domEvent.target.name === "title" || domEvent.target.name === "maker") {
            newGame[domEvent.target.name] = domEvent.target.value   // Modify copy
        } else {
            newGame[domEvent.target.name] = parseInt(domEvent.target.value)   // Modify copy
        }
        setCurrentGame(newGame)     // Set copy as new state
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_player">Number of players: </label>
                    <input type="number" name="number_of_player" required autoFocus className="form-control"
                        value={currentGame.number_of_player}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="game_type_id" className="form-control" onChange={changeGameState}>
                        <option value="0">Select game type:</option>
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
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_player: currentGame.number_of_player,
                        skill_level: currentGame.skill_level,
                        game_type: currentGame.game_type_id
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}>Create</button>
        </form>
    )
}
