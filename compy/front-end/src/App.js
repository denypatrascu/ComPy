import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice';
import Submit from './components/Submit';
import Admin from './components/Admin';

const App = () => {

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/practice" component={Practice} />
      <PrivateRoute exact path="/create-problem" component={Admin} />
      <PrivateRoute path="/problem/:id" component={Submit} />
    </Switch>
  );
};

export default App;