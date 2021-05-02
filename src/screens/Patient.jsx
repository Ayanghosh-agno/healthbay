import React from "react";
import { Switch } from "react-router";

import Profile from "../app/patient/Profile";
import Home from "../app/patient/Home";
import Treatments from "../app/patient/Treatments";
import Nearby from "../app/patient/Nearby";

import PrivateRoute from "../components/PrivateRoute";
import Wrapper from "../app/patient/parts/Wrapper";

function Patient() {
  return (
    <Wrapper>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/treatments" exact component={Treatments} />
        <PrivateRoute path="/nearby" exact component={Nearby} />
        <PrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    </Wrapper>
  );
}

export default Patient;
