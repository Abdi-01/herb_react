import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Admin from "../pages/Admin";
import Forgot from "../pages/Auth/Forgot";
import ForgotSuccess from "../pages/Auth/ForgotSuccess";
import ForgotVerify from "../pages/Auth/ForgotVerify";
import ForgotVerifySuccess from "../pages/Auth/ForgotVerifySuccess";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterSuccess from "../pages/Auth/RegisterSuccess";
import Verify from "../pages/Auth/Verify";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

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
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/profiles/:username/password/change"
            component={ChangePassword}
          />
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRoute;
