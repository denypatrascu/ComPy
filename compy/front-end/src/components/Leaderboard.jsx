import React, { useState, useEffect } from 'react';

/* API REQUEST */
import axios from 'axios';

/* Components */
import Header from './Header';

/* Styling */
import { LeaderboardContainer } from '../assets/styles/Leaderboard';
import { Global } from '../assets/styles/Dashboard';

/* domain */
import { domain } from '../config/deploy';

const Leaderboard = () => {

    const [users, setUsers] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);

    useEffect(() => {
        axios.get(`${domain}/problems/solved`)
            .then((response) => {
                setUsers(response.data.users);
                setSolvedProblems(response.data.solvedProblems);
            })
            .catch((error) => console.log(error))
    }, [])

    let content = (
        <React.Fragment>
            <Global />
            <Header />
            <LeaderboardContainer>
                <div>
                    <h2> Leaderboard </h2>
                    <div>
                        <div>
                            <span> Rank </span>
                            <span> Programmer </span>
                            <span> Solved problems </span>
                        </div>

                        <div>
                            {users.length > 0 ?
                                users.slice(0, 10).map((user, index) => {
                                    return (
                                        <div>
                                            <span> #{index + 1} </span>
                                            <span> {user.split('@')[0]} </span>
                                            <span> {solvedProblems[index]} </span>
                                        </div>
                                    )
                                })
                                : null}
                        </div>
                    </div>
                </div>
            </LeaderboardContainer>
        </React.Fragment>
    );
    return content;
}

export default Leaderboard;