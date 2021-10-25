import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
// import Profile from "../pages/Profile";
import {
  AdminDashboard,
  AdminProducts,
  AdminTransactions,
  CustomOrder,
  CustomReport,
  EditModal,
  ProductDetail,
  Products,
  Profile,
  Sale,
  SalesReport,
  AdminTransactionDetail,
} from "../pages";
import AdminTransactons from "../pages/AdminTransactions";
import Forgot from "../pages/Auth/Forgot";
import ForgotSuccess from "../pages/Auth/ForgotSuccess";
import ForgotVerify from "../pages/Auth/ForgotVerify";
import ForgotVerifySuccess from "../pages/Auth/ForgotVerifySuccess";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterSuccess from "../pages/Auth/RegisterSuccess";
import Verify from "../pages/Auth/Verify";
import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home/Home";
import Transaction from "../pages/Transaction";
import TransactionHistory from "../pages/Transaction/TransactionHistory";

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
            path="/profiles/:username/profile/change"
            component={EditModal}
          />
          <Route
            exact
            path="/transaction-history"
            component={TransactionHistory}
          />
          <Route exact path="/cart" component={Cart} />
          {/* ADMIN ROUTING */}
          <Route component={AdminTransactons} path="/admin/transactions" />
          <Route component={AdminProducts} path="/adminproducts" />
          <Route component={AdminDashboard} path="/admin" />
          <Route component={ProductDetail} path="/productdetail/:product_id" />
          <Route component={AdminTransactions} path="/admintransactions" />
          <Route
            component={AdminTransactionDetail}
            path="/transactiondetail/:transactiondetail_id"
          />
          <Route exact path="/salesreport" component={SalesReport} />
          <Route exact path="/customrecord" component={CustomReport} />
          {/* PRODUCTS ROUTING */}
          <Route component={ProductDetail} path="/productdetail/:product_id" />
          <Route component={CustomOrder} path="/customorder" />
          <Route component={Sale} path="/sale" />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          {/* landing page */}
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRoute;
