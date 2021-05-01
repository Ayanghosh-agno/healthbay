import React from "react";

function InputField(props) {
  return (
    <input
      {...props}
      className={`bg-primary-lighter shadow rounded-md px-4 py-1 ${props.className}`}
    ></input>
  );
}

export default InputField;
