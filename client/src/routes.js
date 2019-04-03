import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';

import Home from './components/home';
import RegisterLogin from './components/register_login';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route component={RegisterLogin} path="/register_login" exact />
        <Route component={Home} path="/" exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
