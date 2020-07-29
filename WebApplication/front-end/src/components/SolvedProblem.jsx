import React, { useState, useEffect } from 'react';

/* API REQUEST */
import axios from 'axios';

/* React router */
import { NavLink } from 'react-router-dom';

/* Deployment */
import { domain } from '../config/deploy';


const SolvedProblem = ({ id }) => {
    const href = `/problem/${id}`;

    const [problem, setProblem] = useState(null);

    useEffect(() => {
        axios.get(`${domain}/problems/${id}`)
            .then(response => {
                setProblem(response.data);
            })
            .catch(error => console.log(error));
    }, [id])

    return (
        <NavLink to={href}>
            {problem !== null ? <span> {problem.title} </span> : null}
        </NavLink>
    );
};

export default SolvedProblem;