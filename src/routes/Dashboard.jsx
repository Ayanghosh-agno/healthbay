import React from "react";
import { Redirect } from "react-router";

import Patient from "../screens/Patient";
import Doctor from "../screens/Doctor";
import Hospital from "../screens/Hospital";
import Ambulance from "../screens/Ambulance";
import Regulation from "../screens/Regulation";

import NotFound from "../screens/404";

import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { whoAmi } = useAuth();
  if (!whoAmi) return <Redirect to="/onboarding" />;

  switch (whoAmi.type) {
    case "PATIENT":
      return <Patient />;
    case "DOCTOR":
      return <Doctor />;
    case "HOSPITAL":
      return <Hospital />;
    case "AMBULANCE":
      return <Ambulance />;
    case "ADMIN":
      return <Regulation />;
    default:
      return <NotFound />;
  }
}

export default Dashboard;
