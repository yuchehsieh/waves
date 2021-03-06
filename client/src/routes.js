import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';
import Shop from './components/shop';
import ProductPage from './components/product';
import ResetUser from './components/reset_user';

import UserDashboard from './components/user';
import AddProduct from './components/user/admin/add_product';
import ManageCategories from './components/user/admin/manage_categories';
import ManageSite from './components/user/admin/manage_site';
import UserCart from './components/user/cart';
import UpdateProfile from './components/user/update_profile';
import AddFile from './components/user/admin/add_file';

import PageNotFound from './components/utils/page_not_found';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          component={Auth(UserDashboard, true)}
          path="/user/dashboard"
          exact
        />
        <Route component={Auth(UserCart, true)} path="/user/cart" exact />

        <Route
          component={Auth(UpdateProfile, true)}
          path="/user/user_profile"
          exact
        />
        <Route
          component={Auth(AddProduct, true)}
          path="/admin/add_product"
          exact
        />
        <Route
          component={Auth(ManageCategories, true)}
          path="/admin/manage_categories"
          exact
        />
        <Route
          component={Auth(ManageSite, true)}
          path="/admin/site_info"
          exact
        />
        <Route component={Auth(AddFile, true)} path="/admin/add_file" exact />

        <Route
          component={Auth(ProductPage, null)}
          path="/product_detail/:id"
          exact
        />
        <Route component={Auth(Register, false)} path="/register" exact />
        <Route
          component={Auth(RegisterLogin, false)}
          path="/register_login"
          exact
        />
        <Route component={Auth(ResetUser, false)} path="/reset_user" exact />
        <Route component={Auth(Shop, null)} path="/shop" exact />
        <Route component={Auth(Home, null)} path="/" exact />

        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
