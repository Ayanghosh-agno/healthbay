import React from "react";

function CircleIconButton(props) {
  return (
    <button
      className={`w-10 h-10 bg-primary-lighter rounded-full shadow-md font-semibold p-2 text-primary text-xl flex items-center ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}

export default CircleIconButton;
