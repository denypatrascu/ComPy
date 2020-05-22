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
                setProblems(response.data.message);
            })
            .catch(error => console.log(error));
    }, [])

    let content = (
        <React.Fragment>
            <Global />
            <Header />
            <PracticeContainer>
                <div>
                    {problems.length > 0 ? problems.map((problem, index) => {
                        return (<Problem key={index} problem={problem} />)
                    }) : <h1> No problems available yet! </h1>}
                </div>
            </PracticeContainer>
        </React.Fragment>
    );
    return content;
}

export default Practice;