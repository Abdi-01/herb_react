import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Forgot from '../pages/Auth/Forgot';
import ForgotSuccess from '../pages/Auth/ForgotSuccess';
import ForgotVerify from '../pages/Auth/ForgotVerify';
import ForgotVerifySuccess from '../pages/Auth/ForgotVerifySuccess';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import RegisterSuccess from '../pages/Auth/RegisterSuccess';
import Verify from '../pages/Auth/Verify';
import ChangePassword from '../pages/ChangePassword';
import Profile from '../pages/Profile';
import {
  Products,
  ProductDetail,
  Sale,
  CustomOrder,
  AdminDashboard,
  AdminProducts,
  AdminTransactions,
  adminTransactionDetail,
  Home,
} from '../pages';
import Transaction from '../pages/Transaction';
import Cart from '../pages/Cart';
import TransactionHistory from '../pages/TransactionHistory';

function AppRoute() {
  return (
    <Router>
      <Layout>
        <Switch>
          {/* auth */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />\
          <Route exact path="/registered" component={RegisterSuccess} />
          <Route exact path="/verify/:token" component={Verify} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/forgot/success" component={ForgotSuccess} />
          <Route
            exact
            path="/forgot/verify/success"
            component={ForgotVerifySuccess}
          />
          <Route exact path="/forgot/verify/:token" component={ForgotVerify} />
          {/* profile */}
          <Route
            exact
            path="/profiles/:username/password/change"
            component={ChangePassword}
          />
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path="/transaction" component={Transaction} />
          <Route
            exact
            path="/transaction-history"
            component={TransactionHistory}
          />
          <Route exact path="/cart" component={Cart} />
          {/* ADMIN ROUTING */}
          <Route component={AdminDashboard} path="/admin" />
          <Route component={AdminProducts} path="/adminproducts" />
          <Route component={AdminTransactions} path="/admintransactions" />
          <Route
            component={adminTransactionDetail}
            path="/transactiondetail/:transactiondetail_id"
          />
          {/* PRODUCTS ROUTING */}
          <Route component={ProductDetail} path="/productdetail/:product_id" />
          <Route component={CustomOrder} path="/customorder" />
          <Route component={Sale} path="/sale" />
          <Route exact path="/products" component={Products} />
          {/* landing page routing */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRoute;
