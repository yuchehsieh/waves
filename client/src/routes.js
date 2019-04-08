import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';

import UserDashboard from './components/user';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route component={Register} path="/register" exact />
        <Route component={RegisterLogin} path="/register_login" exact />
        <Route component={UserDashboard} path="/user/dashboard" exact />
        <Route component={Home} path="/" exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
