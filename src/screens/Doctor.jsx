import React from "react";
import { Switch } from "react-router";

import Home from "../app/doctor/Home";
import Profile from "../app/doctor/Profile";

import PrivateRoute from "../components/PrivateRoute";
import Wrapper from "../app/doctor/parts/Wrapper";

function Patient() {
  return (
    <Wrapper>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    </Wrapper>
  );
}

export default Patient;
