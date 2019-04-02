import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';

import Home from './components/home';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route component={Home} path="/" exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
