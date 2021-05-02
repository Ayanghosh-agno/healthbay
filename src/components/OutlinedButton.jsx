import React from "react";

import LoadingSvg from "../components/LoadingSvg";

function OutlinedButton(props) {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={`bg-white border-4 border-primary rounded-lg shadow-md font-semibold px-6 text-primary py-2 text-xl flex justify-center items-center ${
        props.className
      } ${
        props.loading && "opacity-75 cursor-not-allowed"
      } appearance-none focus:border-primary focus:outline-none focus:shadow-outline`}
      disabled={!!props.loading}
    >
      {props.loading && <LoadingSvg className="absolute text-black" />}
      {props.children}
    </button>
  );
}

export default OutlinedButton;
