import React from "react";

import LoadingSvg from "../components/LoadingSvg";

function FilledButton(props) {
  return (
    <button
      {...props}
      className={`relative bg-primary rounded-lg shadow-md font-semibold px-6 text-white py-2 text-xl flex justify-center items-center ${
        props.className
      } ${
        props.loading && "bg-opacity-75 cursor-not-allowed"
      } appearance-none focus:border-primary focus:outline-none focus:shadow-outline`}
      onClick={props.onClick}
      disabled={!!props.loading}
    >
      {props.loading && <LoadingSvg className="absolute text-black" />}
      {props.children}
    </button>
  );
}

export default FilledButton;
