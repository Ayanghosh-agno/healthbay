import React from "react";
import { Switch } from "react-router";

import Home from "../app/hospital/Home";

import PrivateRoute from "../components/PrivateRoute";

function Hospital() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
    </Switch>
  );
}

export default Hospital;
