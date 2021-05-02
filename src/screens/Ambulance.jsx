import React from "react";
import { Switch } from "react-router";

import Home from "../app/ambulance/Home";

import PrivateRoute from "../components/PrivateRoute";

function Patient() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
    </Switch>
  );
}

export default Patient;
