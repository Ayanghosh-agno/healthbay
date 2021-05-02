import React from "react";

function Data(props) {
  return (
    <div className={`${props.className}`}>
      <div className="uppercase font-medium" style={{ color: "#888" }}>
        {props.label}
      </div>
      <div className="border-b border-primary text-xl font-medium">
        {props.value}
      </div>
    </div>
  );
}

export default Data;
