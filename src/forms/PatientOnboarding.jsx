import React, { useRef, useState } from "react";

import DropdownInput from "../components/DropdownInput";
import FilledButton from "../components/FilledButton";
import InputField from "../components/InputField";

import { useAuth } from "../contexts/AuthContext";

const bloodGroups = [
  { value: "A RhD positive (A+)", label: "A RhD positive (A+)" },
  { value: "A RhD negative (A-)", label: "A RhD negative (A-)" },
  { value: "B RhD positive (B+)", label: "B RhD positive (B+)" },
  { value: "B RhD negative (B-)", label: "B RhD negative (B-)" },
  { value: "O RhD positive (O+)", label: "O RhD positive (O+)" },
  { value: "O RhD negative (O-)", label: "O RhD negative (O-)" },
  { value: "AB RhD positive (AB+)", label: "AB RhD positive (AB+)" },
  { value: "AB RhD negative (AB-)", label: "AB RhD negative (AB-)" },
];

function UserOnboarding() {
  const name = useRef(null);
  const height = useRef(null);
  const weight = useRef(null);
  const dob = useRef(null);
  const blood_group = useRef(null);
  const picture = useRef(null);
  const contact = useRef(null);

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [validationErr, setValidationErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name.current.value);
      formData.append("height", height.current.value);
      formData.append("weight", weight.current.value);
      formData.append("dob", dob.current.value);
      formData.append("blood_group", blood_group.current.value);
      formData.append("contact", contact.current.value);
      formData.append("picture", picture.current.files[0]);

      const idToken = await currentUser.getIdToken();

      await fetch("https://api.healthbay.us/onboarding/user", {
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
        <label className="font-semibold uppercase" htmlFor="name">
          Your Name
        </label>
        <InputField
          className="mt-1 text-lg"
          type="text"
          id="name"
          ref={name}
          placeholder="Enter your name"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="height">
          Height
        </label>
        <InputField
          className="mt-1 text-lg"
          type="number"
          id="height"
          ref={height}
          placeholder="Your height in cms"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="weight">
          Weight
        </label>
        <InputField
          className="mt-1 text-lg"
          type="number"
          id="weight"
          placeholder="Your weight in kgs"
          ref={weight}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase" htmlFor="dob">
          Date of Birth
        </label>
        <InputField
          className="mt-1 text-lg appearance-none"
          type="date"
          id="dob"
          ref={dob}
        />
      </div>
      <div className="flex flex-col mb-4 relative">
        <label className="font-semibold uppercase" htmlFor="blood_group">
          Blood Group
        </label>
        <DropdownInput
          options={bloodGroups}
          id="blood_group"
          ref={blood_group}
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
      <div className="flex flex-col mb-4 relative">
        <label className="font-semibold uppercase" htmlFor="picture">
          Picture
        </label>
        <InputField
          className="mt-1 text-lg appearance-none cursor-pointer"
          type="file"
          id="picture"
          ref={picture}
          accept="image/*"
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

export default UserOnboarding;
