import React from "react";
import { useHistory } from "react-router";

import BottomRibbon from "./BottomRibbon";
import TopRibbon from "./TopRibbon";

import { useAuth } from "../../../contexts/AuthContext";

function Wrapper(props) {
  const { whoAmi } = useAuth();
  const history = useHistory();

  if (
    history.location.pathname.startsWith("/treatment/") &&
    whoAmi.type === "PATIENT"
  )
    return (
      <div className="overflow-auto hide-scrollbar h-screen">
        {props.children}
      </div>
    );

  return (
    <div className="flex flex-col justify-between h-screen">
      <TopRibbon />
      <div className="overflow-auto hide-scrollbar">{props.children}</div>
      <BottomRibbon />
    </div>
  );
}

export default Wrapper;
