import React, { useState } from 'react';

/* React router */
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'

/* Firebase */
import fb from '../config/firebase';

/* Styling */
import { RegisterContainer, Global } from '../assets/styles/Register';

const Register = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await fb.auth().createUserWithEmailAndPassword(email.trim(), password)
            history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <React.Fragment>
            <Global />
            <RegisterContainer>
                <form onSubmit={handleSubmit}>
                    <h3> ComPy </h3>
                    <h2> Create your account </h2> 
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit"> Sign up </button>
                    <NavLink to="/" className="nav-to-login"> Sign in instead? </NavLink>

                    <span> </span>
                </form>
            </RegisterContainer>
        </React.Fragment>
    );
}

export default withRouter(Register) 