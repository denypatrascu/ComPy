import React from 'react';
import { Global } from '../assets/styles/Dashboard';
import Header from './Header';
import '../assets/css/Header.css';
import '../assets/css/Button.css';

const Dashboard = () => {

    let content = (
        <React.Fragment>
            <Global />
            <Header />
        </React.Fragment>

    );
    return content;
}

export default Dashboard;