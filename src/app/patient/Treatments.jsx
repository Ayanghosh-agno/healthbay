import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { FiSend } from "react-icons/fi";

import InputField from "../../components/InputField";
import Treatment from "../../components/Treatment";

function Treatments(props) {
  const history = useHistory();
  const havingSymptoms = useRef(null);

  useEffect(() => {
    if (props.location.state && props.location.state.symptomClick)
      havingSymptoms.current.focus();
  }, [props.location.state]);

  return (
    <div className="px-4 mb-4">
      <div className="mt-4 flex flex-col">
        <label className="font-medium text-xl" htmlFor="symptoms">
          Having any symptoms?
        </label>
        <InputField
          className="mt-2 text-md h-10"
          type="text"
          id="symptoms"
          ref={havingSymptoms}
          placeholder="Enter symptoms you're facing..."
        />
      </div>
      <div className="mt-4 flex flex-col">
        <label className="font-medium text-xl" htmlFor="find-doc">
          Find your doctor
        </label>
        <InputField
          className="mt-2 text-md h-10"
          type="text"
          id="find-doc"
          placeholder="Search using name, profession..."
          onClick={() =>
            history.push("/nearby", {
              findDocClick: true,
            })
          }
        />
      </div>
      <div className="mt-4 flex flex-col">
        <div className="font-medium text-xl">Ongoing Treatments</div>
        <div className="text-sm" style={{ color: "#888" }}>
          You can track your ongoing treatments from this page. All your doctors
          will show up here. Please note that they can see your live heart and
          sensor monitors when it is connected and pinging!
        </div>
      </div>
      <>
        <Treatment>
          <div className="relative px-4 py-3 flex space-x-8 items-center">
            <img
              className="w-16 h-16 rounded ml-2"
              src="https://picsum.photos/200/200"
              alt="Doctor"
            />
            <div className="text-white">
              <div className="text-lg">Dr. Shahrukh Khan</div>
              <div className="text-sm">Gynaecologist</div>
              <InputField
                className="mt-2 text-xs bg-primary bg-opacity-20 text-black placeholder-black border-none"
                type="text"
                placeholder="Type a message..."
              />
            </div>
            <FiSend className="absolute top-2 right-2" />
          </div>
        </Treatment>
        <Treatment>
          <div className="relative px-4 py-3 flex space-x-8 items-center">
            <img
              className="w-16 h-16 rounded ml-2"
              src="https://picsum.photos/200/200"
              alt="Doctor"
            />
            <div className="text-white">
              <div className="text-lg">Dr. Shahrukh Khan</div>
              <div className="text-sm">Gynaecologist</div>
              <InputField
                className="mt-2 text-xs bg-primary bg-opacity-20 text-black placeholder-black border-none"
                type="text"
                placeholder="Type a message..."
              />
            </div>
            <FiSend className="absolute top-2 right-2" />
          </div>
        </Treatment>
        <Treatment>
          <div className="relative px-4 py-3 flex space-x-8 items-center">
            <img
              className="w-16 h-16 rounded ml-2"
              src="https://picsum.photos/200/200"
              alt="Doctor"
            />
            <div className="text-white">
              <div className="text-lg">Dr. Shahrukh Khan</div>
              <div className="text-sm">Gynaecologist</div>
              <InputField
                className="mt-2 text-xs bg-primary bg-opacity-20 text-black placeholder-black border-none"
                type="text"
                placeholder="Type a message..."
              />
            </div>
            <FiSend className="absolute top-2 right-2" />
          </div>
        </Treatment>
      </>
    </div>
  );
}

export default Treatments;
