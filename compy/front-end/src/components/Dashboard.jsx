import React from 'react';

/* Styling */
import { Global } from '../assets/styles/Dashboard';
import '../assets/css/Header.css';
import '../assets/css/Button.css';

/* Components */
import Header from './Header';
import Home from './Home';


const Dashboard = () => {

    let content = (
        <React.Fragment>
            <Global />
            <Header />
            <Home />
        </React.Fragment>

    );
    return content;
}

export default Dashboard;