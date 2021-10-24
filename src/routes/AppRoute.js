import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Forgot from "../pages/Auth/Forgot";
import ForgotSuccess from "../pages/Auth/ForgotSuccess";
import ForgotVerify from "../pages/Auth/ForgotVerify";
import ForgotVerifySuccess from "../pages/Auth/ForgotVerifySuccess";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterSuccess from "../pages/Auth/RegisterSuccess";
import Verify from "../pages/Auth/Verify";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home/Home";
// import Profile from "../pages/Profile";
import {
  Profile,
  EditModal,
  LandingPage,
  AdminDashboard,
  AdminProducts,
  SalesReport,
  ProductDetail,
  CustomReport,
  CustomOrder,
  UserTransactions,
  TransactionDetail,
  Products,
  Sale,
} from '../pages';
import Transaction from '../pages/Transaction';
import Cart from '../pages/Cart';
import TransactionHistory from '../pages/TransactionHistory';
import AdminTransactons from "../pages/AdminTransactions";

function AppRoute() {
  return (
    <Router>
      <Layout>
        <Switch>
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
          <Route
            exact
            path="/profiles/:username/password/change"
            component={ChangePassword}
          />
          <Route exact path="/profiles/:username" component={Profile} />
          {/* ADMIN ROUTING */}
          <Route component={AdminTransactons} path="/admin/transactions" />
          <Route component={AdminProducts} path="/adminproducts" />
          <Route component={AdminDashboard} path="/admin" />
          <Route component={ProductDetail} path="/productdetail/:product_id" />
          <Route component={UserTransactions} path="/transactions" />
          <Route
            component={TransactionDetail}
            path="/transactiondetail/:transactiondetail_id"
          />
          {/* PRODUCTS ROUTING */}
          <Route component={ProductDetail} path="/productdetail/:product_id" />
          <Route component={CustomOrder} path="/customorder" />
          <Route component={Sale} path="/sale" />
          <Route exact path="/products" component={Products} />
          <Route exact path="/transaction" component={Transaction} />
          <Route
            exact
            path="/transaction-history"
            component={TransactionHistoryItem}
          />
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path="/profiles/:username/profile/change" component={EditModal} />
          <Route exact path="/salesreport" component={SalesReport} />
          <Route exact path="/customrecord" component={CustomReport} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRoute;
