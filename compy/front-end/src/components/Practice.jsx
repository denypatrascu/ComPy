import React, { useState, useEffect } from 'react';

/* Styling */
import { Global } from '../assets/styles/Dashboard';
import { PracticeContainer } from '../assets/styles/Practice';

/* API Request */
import axios from 'axios';

/* Components */
import Header from './Header';
import Problem from './Problem';

/* domain */
import { domain } from '../config/deploy';

const Practice = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        axios.get(`${domain}/problems`)
            .then(response => {
                setProblems(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <React.Fragment>
            <Global />
            <Header />
            <PracticeContainer>
                <div>
                    <div>
                        {problems.length > 0 ? problems.map((problem, index) => {
                            return (<Problem key={index} problem={problem} />)
                        }) : <h1>No problems available yet!</h1>}
                    </div>
                </div>
            </PracticeContainer>
        </React.Fragment>
    );
};

export default Practice;