import React from "react";

function FilledButton(props) {
  return (
    <button
      className={`bg-primary rounded-lg shadow-md font-semibold px-6 text-white py-2 text-xl flex items-center ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default FilledButton;
