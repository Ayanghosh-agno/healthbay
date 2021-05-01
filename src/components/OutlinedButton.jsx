import React from "react";

function OutlinedButton(props) {
  return (
    <button
      className={`bg-white border-4 border-primary rounded-lg shadow-md font-semibold px-6 text-primary py-2 text-xl flex items-center ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default OutlinedButton;
