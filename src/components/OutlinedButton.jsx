import React from "react";

function OutlinedButton(props) {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={`bg-white border-4 border-primary rounded-lg shadow-md font-semibold px-6 text-primary py-2 text-xl flex justify-center items-center ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default OutlinedButton;
