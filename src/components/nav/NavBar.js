import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">LevelUp</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>

            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
