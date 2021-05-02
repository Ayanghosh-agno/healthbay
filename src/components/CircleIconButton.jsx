import React from "react";

function CircleIconButton(props) {
  return (
    <button
      className={`focus:outline-none w-8 h-8 bg-primary-lighter rounded-full shadow-md font-semibold p-2 text-primary text-xl flex items-center ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
      {props.children}
    </button>
  );
}

export default CircleIconButton;
