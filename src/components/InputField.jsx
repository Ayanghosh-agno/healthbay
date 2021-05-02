import React from "react";

const InputField = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`border bg-primary-lighter shadow rounded-md px-4 py-1 appearance-none focus:border-primary focus:outline-none focus:shadow-outline ${
        props.className
      } ${props.error && "border-2 border-red-600"}`}
    ></input>
  );
});

export default InputField;
