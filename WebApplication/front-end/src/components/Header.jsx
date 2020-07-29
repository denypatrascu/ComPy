import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from './Auth';
import fb from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

    const [username, setUsername] = useState(null);
    const [showUpMenu, setShowUpMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setUsername(currentUser.email.split('@')[0])
    }, [currentUser.email]);


    const handleLogout = async () => {
        try {
            await fb.auth().signOut();
        } catch (error) {
            alert(error)
        }
    };

    const handleMenuClick = () => {
        setShowUpMenu(!showUpMenu)
    };

    let content = (
        <React.Fragment>
            <header>
                <div className="container">
                    <div className="title">
                        <NavLink to="/">
                            <span>CP</span>ComPy
                    </NavLink>
                    </div>
                    <nav className="navbar">
                        <NavLink activeClassName="active" to="/dashboard"> Home </NavLink>
                        <NavLink activeClassName="active" to="/practice"> Practice </NavLink>
                        <NavLink activeClassName="active" to="/leaderboard"> Leaderboard </NavLink>
                        <NavLink activeClassName="active" to="/create-problem" className="button-container">
                            <button className="button">
                                <FontAwesomeIcon icon={faPlus} /> problem
                            </button>
                        </NavLink>

                        <span className="button-container">
                            <button className="button" onClick={handleMenuClick}> {username} </button>
                            {showUpMenu ? <button className="sign-out-button" onClick={handleLogout} > Sign Out </button> : null}
                        </span>
                    </nav>
                </div>
            </header>
        </React.Fragment>
    );
    return content;
}

export default Header;