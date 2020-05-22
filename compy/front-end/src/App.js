import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';

const App = () => {

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/practice" component={Practice} />
    </Switch>
  );
};

export default App;