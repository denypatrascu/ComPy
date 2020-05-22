import React from 'react';

/* React router */
import { NavLink } from 'react-router-dom';

const Problem = ({ problem }) => {

    /* we have to change the routes to /problem/problemId -> before we do that, we have to make the page */ 
    let content = (
        <NavLink to="/practice">
            <div>
                <h3> {problem.title} </h3>
                <span> {problem.difficulty}, Rating: {problem.rating}, Success rate: 100% </span>
            </div>
            <NavLink to="/practice"> Solve Problem </NavLink>
        </NavLink>
    );
    return content;
}

export default Problem;