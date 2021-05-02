import React from "react";
import { Switch } from "react-router";

import Home from "../app/doctor/Home";
import Profile from "../app/doctor/Profile";
import Treatment from "../app/doctor/Treatment";
import Patient from "../app/doctor/Patient";

import PrivateRoute from "../components/PrivateRoute";
import Wrapper from "../app/doctor/parts/Wrapper";

function Doctor() {
  return (
    <Wrapper>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/treatment/:trtId" exact component={Treatment} />
        <PrivateRoute path="/patient/:patientId" exact component={Patient} />
      </Switch>
    </Wrapper>
  );
}

export default Doctor;
