import React from "react";
import { FiPhone } from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";

import FilledButton from "../../components/FilledButton";

function Profile() {
  const { whoAmi, signOut } = useAuth();
  const doc = whoAmi.profile;

  return (
    <div className="flex flex-col items-center mx-4">
      <img
        className="w-40 rounded-full border-4 border-dashed p-2 shadow border-primary"
        src={doc.picture}
        alt="Doctor"
      />
      <div className="text-2xl mt-4 font-semibold relative">
        <div className="">{doc.name}</div>
        {doc.verified && (
          <img
            src="/assets/images/verified.jpg"
            alt="Verified"
            className="w-8 h-8 rounded-full absolute top-0 right-0 -mr-8"
          ></img>
        )}
      </div>
      <div className="flex space-x-2 items-center text-primary">
        <FiPhone />
        <a href={`tel:${doc.contact}`} className="">
          {doc.contact}
        </a>
      </div>
      <div className="mt-2">Specialization: {doc.specialization}</div>
      <div className="">
        Chamber:{" "}
        {doc.hospital_id ? (
          <a
            className="text-primary"
            href={`https://www.google.com/maps/search/?api=1&query=${doc.hospital.location[0]},${doc.hospital.location[1]}`}
          >
            Hospital {doc.hospital.name}
          </a>
        ) : (
          <a
            className="text-primary"
            href={`https://www.google.com/maps/search/?api=1&query=${
              JSON.parse(doc.chamber_location)[0]
            },${JSON.parse(doc.chamber_location)[1]}`}
          >
            Personal Chamber
          </a>
        )}
      </div>
      <div className="">Timings: {doc.timings}</div>
      <FilledButton className="mt-6 w-full" onClick={signOut}>
        Log Out
      </FilledButton>
    </div>
  );
}

export default Profile;
