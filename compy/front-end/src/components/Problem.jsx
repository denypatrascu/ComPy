import React from 'react';

/* React router */
import { NavLink } from 'react-router-dom';

import { Chip, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Problem = ({ problem }) => {
    let { title, description, difficulty, categories } = problem;
    const id = problem._id;
    const href = `/problem/${id}`;

    if (description.length > 100) {
        description = `${description.substring(0, 100)} [...]`;
    }

    return (
        <NavLink to={href}>
            <div className="content">
                <h3>{title}</h3>
                <div className="description">{description}</div>
                <div className="difficulty">{difficulty}</div>
                <div className="categories">
                    {categories.map(category => (
                        <Chip size="small" className="chip" label={category}/>)
                    )}
                </div>
            </div>
            <NavLink to={href} className="solve">
                <Button variant="outlined">
                    Solve Problem <FontAwesomeIcon icon={ faChevronRight } />
                </Button>
            </NavLink>
        </NavLink>
    );
};

export default Problem;