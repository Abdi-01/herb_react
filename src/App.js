import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// path directory
import { LandingPage, AdminProducts } from './pages';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AdminProducts} path="/admin" />
        <Route component={LandingPage} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
