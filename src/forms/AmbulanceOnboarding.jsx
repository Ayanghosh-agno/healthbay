import React, { useRef, useState } from "react";

import FilledButton from "../components/FilledButton";
import InputField from "../components/InputField";

import { useAuth } from "../contexts/AuthContext";

function AmbulanceOnboarding() {
  const vehicle_no = useRef(null);
  const license_no = useRef(null);
  const license_document = useRef(null);
  const facilities = useRef(null);
  const contact = useRef(null);

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [validationErr, setValidationErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("vehicle_no", vehicle_no.current.value);
      formData.append("license_no", license_no.current.value);
      formData.append("license_doc", license_document.current.files[0]);
      formData.append("facilities", facilities.current.value);
      formData.append("contact", contact.current.value);

      const idToken = await currentUser.getIdToken();

      await fetch("https://api.healthbay.us/onboarding/ambulance", {
        method: "POST",
        body: formData,
        headers: {
          authorization: "Bearer " + idToken,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      setValidationErr("Please enter the fields properly");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="vehicle_no">
          Vehicle Number
        </label>
        <InputField
          className="mt-1 text-lg"
          type="text"
          id="vehicle_no"
          ref={vehicle_no}
          placeholder="Enter hospital's name"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="license_no">
          License No
        </label>
        <InputField
          className="mt-1 text-lg"
          type="number"
          id="license_no"
          ref={license_no}
          placeholder="Your Govt Approved License No"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="license_document">
          License Document
        </label>
        <InputField
          className="mt-1 text-lg"
          type="file"
          id="license_document"
          ref={license_document}
          accept="application/pdf"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="facilities">
          Facilities
        </label>
        <InputField
          className="mt-1 text-lg"
          type="text"
          id="facilities"
          ref={facilities}
          placeholder="AC, Oxygen Supply, etc"
        />
      </div>

      <div className="flex flex-col mb-4 relative">
        <label className="font-semibold uppercase" htmlFor="contact">
          Contact Number
        </label>
        <InputField
          className="mt-1 text-lg"
          type="text"
          id="contact"
          placeholder="Mobile number"
          ref={contact}
        />
      </div>

      {validationErr && (
        <div className="text-red-600 my-1">{validationErr}</div>
      )}
      <FilledButton type="submit" className="w-full" loading={loading}>
        Submit
      </FilledButton>
      <div className="mt-4 mx-auto text-xs" style={{ color: "#888888" }}>
        Please choose this information carefully, you can’t revert this ever
        again.
      </div>
    </form>
  );
}

export default AmbulanceOnboarding;
