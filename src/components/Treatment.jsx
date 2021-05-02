import React from "react";

function Treatment(props) {
  return (
    <div
      className={`mt-4 ${
        props.closed ? "bg-gray-500" : "bg-primary"
      } p-2 rounded-xl text-white ${props.className}`}
      {...props}
    >
      {props.children}
    </div>
  );
}

export default Treatment;
