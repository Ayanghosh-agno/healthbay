import React from "react";
import BottomRibbon from "./BottomRibbon";
import TopRibbon from "./TopRibbon";

function Wrapper(props) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <TopRibbon />
      <div className="overflow-auto">{props.children}</div>
      <BottomRibbon />
    </div>
  );
}

export default Wrapper;
