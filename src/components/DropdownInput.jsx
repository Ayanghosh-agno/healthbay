import React from "react";
import { FiChevronDown } from "react-icons/fi";

const DropdownInput = React.forwardRef((props, ref) => {
  let options = props.options;

  if (props.lvalues) {
    options = props.lvalues.map((x) => ({ value: x, label: x }));
  }

  return (
    <>
      <select
        className={`cursor-pointer mt-1 bg-primary-lighter appearance-none shadow rounded-md px-4 py-1 text-lg cursor-pointer${
          props.className
        } ${props.error && "border-2 border-red-600"}`}
        ref={ref}
      >
        {(options || []).map((x, i) => (
          <option value={x.value} key={i}>
            {x.label}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute bottom-1 right-4 text-2xl text-primary" />
    </>
  );
});

export default DropdownInput;
