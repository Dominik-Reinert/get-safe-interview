import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Buyflow, { ProductIds } from "./buyflow/Buyflow";
import { Routes } from "./routes/routes";
import { SuccessPage } from "./success/success";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path={Routes.SUCCESS}>
            <SuccessPage />
          </Route>
          <Route path={Routes.BUY_INSURANCE_DEV}>
            <Buyflow productId={ProductIds.devIns} />
          </Route>
          <Route path={Routes.HOME}>
            <p>Welcome to Getsafe's Developer Insurance</p>
            <Link to={Routes.BUY_INSURANCE_DEV}>Get started!</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
