import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';

import UserDashboard from './components/user';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          component={Auth(UserDashboard, true)}
          path="/user/dashboard"
          exact
        />
        <Route component={Auth(Register, false)} path="/register" exact />
        <Route
          component={Auth(RegisterLogin, false)}
          path="/register_login"
          exact
        />
        <Route component={Auth(Home, null)} path="/" exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
