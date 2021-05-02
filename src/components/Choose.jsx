import React from "react";

function Choose(props) {
  return (
    <div
      className={`flex items-center shadow-md space-x-1 border-2 py-3 px-4 rounded-lg my-3 bg-white cursor-pointer ${
        props.checked ? "border-primary" : "mx-2"
      }`}
      onClick={props.onChange}
    >
      <div>
        <div className="flex items-center space-x-3 ml-2">
          <div
            className={`relative w-4 h-4 rounded-md ${
              props.checked ? "bg-primary" : "bg-primary-lighter"
            }`}
          >
            {props.checked && (
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
            )}
          </div>
          <div className="font-medium text-xl">{props.label}</div>
        </div>
        {props.desc && (
          <div className="mt-2 px-2 text-sm" style={{ color: "#888888" }}>
            {props.desc}
          </div>
        )}
      </div>
      {props.picture && (
        <img
          className="w-32 h-full rounded-full shadow"
          alt={props.label}
          src={props.picture}
        />
      )}
    </div>
  );
}

export default Choose;
