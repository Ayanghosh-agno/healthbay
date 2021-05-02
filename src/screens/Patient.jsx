import React from "react";
import { Switch } from "react-router";

import Profile from "../app/patient/Profile";
import Home from "../app/patient/Home";
import Treatments from "../app/patient/Treatments";
import Nearby from "../app/patient/Nearby";

import PrivateRoute from "../components/PrivateRoute";
import Wrapper from "../app/patient/parts/Wrapper";
import Emergency from "../app/patient/Emergency";
import Doctor from "../app/patient/Doctor";
import Treatment from "../app/patient/Treatment";

function Patient() {
  return (
    <Wrapper>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/treatments" exact component={Treatments} />
        <PrivateRoute path="/nearby" exact component={Nearby} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/emergency" exact component={Emergency} />
        <PrivateRoute path="/doctor/:docId" exact component={Doctor} />
        <PrivateRoute path="/treatment/:trtId" exact component={Treatment} />
      </Switch>
    </Wrapper>
  );
}

export default Patient;
