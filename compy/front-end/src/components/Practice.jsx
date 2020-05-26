import React, { useState, useEffect } from 'react';

/* Styling */
import { Global } from '../assets/styles/Dashboard';
import { PracticeContainer } from '../assets/styles/Practice';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/* API Request */
import axios from 'axios';

/* Components */
import Header from './Header';
import Problem from './Problem';

/* domain */
import { domain } from '../config/deploy';

const Practice = () => {
    const [problems, setProblems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const [categoriesChecked, setCategoriesChecked] = useState([]);

    useEffect(() => {
        axios.get(`${domain}/problems`)
            .then(response => {
                setProblems(response.data);
            })
            .catch(error => console.error(error));

        axios.get(`${domain}/problems/category`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleFetchProblems = async () => {
        await axios.post(`${domain}/problems/filter`, { difficulties: difficulties, categories: categoriesChecked})
            .then((response) => {
                setProblems(response.data);
            })
            .catch((error) => console.log(error));
    }

    const handleDifficultyCheck = (e) => {
        let check = false;
        let difficultiesCopy = difficulties;
        for (let i = 0; i < difficultiesCopy.length; i++) {
            if (difficultiesCopy[i] === e.target.name) {
                check = true;
                difficultiesCopy.splice(i, 1);
                break;
            }
        }

        if (check === false) difficultiesCopy.push(e.target.name);
        setDifficulties(difficultiesCopy);

        handleFetchProblems();
    }

    const handleCategoriesCheck = (e) => {
        let check = false;
        let categoriesCopy = categoriesChecked;
        for (let i = 0; i < categoriesCopy.length; i++) {
            if (categoriesCopy[i] === e.target.name) {
                check = true;
                categoriesCopy.splice(i, 1);
                break;
            }
        }

        if (check === false) categoriesCopy.push(e.target.name);

        setCategoriesChecked(categoriesCopy);

        handleFetchProblems();
    }

    return (
        <React.Fragment>
            <Global />
            <Header />
            <PracticeContainer>
                <div>
                    <div>
                        {problems.length > 0 ? problems.map((problem, index) => {
                            return (<Problem key={index} problem={problem} />)
                        }) : <h2>No problems available yet! 😔</h2>}
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <h3> Difficulty </h3>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            style={{ color: "hsl(174, 38%, 66%)", height: "1.2em", width: "1.4em" }}
                                            onChange={(e) => handleDifficultyCheck(e)}
                                            name="Easy"
                                        />
                                    }
                                    label={<span style={{ fontSize: '0.9em', fontFamily: "Poppins", fontWeight: "500" }}> Easy </span>}
                                />
                            </div>

                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            style={{ color: "hsl(174, 38%, 66%)", height: "1.2em", width: "1.4em" }}
                                            onChange={(e) => handleDifficultyCheck(e)}
                                            name="Medium"
                                        />
                                    }
                                    label={<span style={{ fontSize: '0.9em', fontFamily: "Poppins", fontWeight: "500" }}> Medium </span>}
                                />
                            </div>

                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            style={{ color: "hsl(174, 38%, 66%)", height: "1.2em", width: "1.4em" }}
                                            onChange={(e) => handleDifficultyCheck(e)}
                                            name="Hard"
                                        />
                                    }
                                    label={<span style={{ fontSize: '0.9em', fontFamily: "Poppins", fontWeight: "500" }}> Hard </span>}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3> Categories </h3>
                        {categories.length > 0 ? categories.map((category, index) => {
                            return (
                                <div key={index}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{ color: "hsl(174, 38%, 66%)", height: "1.2em", width: "1.4em" }}
                                                onChange={(e) => handleCategoriesCheck(e)}
                                                name={category}
                                            />
                                        }
                                        label={<span style={{ fontSize: '0.9em', fontFamily: "Poppins", fontWeight: "500" }}> {category} </span>}
                                    />
                                </div>)
                        }) : null}
                    </div>
                </div>
            </PracticeContainer>
        </React.Fragment>
    );
};

export default Practice;