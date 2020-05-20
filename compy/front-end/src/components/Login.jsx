import React, { useState, useContext } from 'react';

/* React router */
import { withRouter, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

/* API REQUEST */
import axios from 'axios';

/* Firebase */
import fb from '../config/firebase';

/* Components */
import { AuthContext } from './Auth';

/* Styling */
import { RegisterContainer, Global } from '../assets/styles/Register';

/* Domain */
import { domain } from '../config/deploy';

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await fb.auth().signInWithEmailAndPassword(email.trim(), password)
            const response = await axios.post(`${domain}/login/${email}`);
            console.log(response.data.result);

            localStorage.setItem('token', response.data.result);
            history.push("/dashboard")
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    return (
        <React.Fragment>
            <Global />
            <RegisterContainer>
                <form onSubmit={handleLogin}>
                    <h3> ComPy </h3>
                    <h2> Log into your account </h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />


                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit"> Sign in </button>
                    <NavLink to="/register"> Sign up instead? </NavLink>

                    <span> </span>
                </form>
            </RegisterContainer>
        </React.Fragment>
    );
}

export default withRouter(Login) 