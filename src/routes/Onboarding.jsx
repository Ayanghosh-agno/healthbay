import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import Choose from "../components/Choose";
import CircleIconButton from "../components/CircleIconButton";
import FilledButton from "../components/FilledButton";

import UserOnboarding from "../forms/PatientOnboarding";
import DoctorOnboarding from "../forms/DoctorOnboarding";
import HospitalOnboarding from "../forms/HospitalOnboarding";
import AmbulanceOnboarding from "../forms/AmbulanceOnboarding";

function Onboarding() {
  const [whoIsIt, setWhoIsIt] = useState(null);
  const [pageNo, setPageNo] = useState(1);

  return (
    <div className="overflow-auto flex flex-col">
      <img
        className="w-full shadow-inner"
        src="/assets/images/wonder.png"
        alt="I Wonder"
      />
      {pageNo === 1 ? (
        <div className="mt-2 p-4 h-full">
          <div className="text-2xl font-semibold">Who are you?</div>
          <div className="text-sm mt-2" style={{ color: "#888888" }}>
            We need to know which section of the HealthCare galaxy you belong to
            set your profile accordingly.
          </div>

          <div className="mt-4">
            <Choose
              label="Patient"
              desc="Choose this if you’re a normal hooman being looking to be  secure on the healthcare front"
              picture="/assets/images/is-patient.png"
              checked={whoIsIt === "patient"}
              onChange={() => setWhoIsIt("patient")}
            />
            <Choose
              label="Doctor"
              desc="We will be needing your License information to verify you. Kudos for saving the world!"
              picture="/assets/images/is-doctor.png"
              checked={whoIsIt === "doctor"}
              onChange={() => setWhoIsIt("doctor")}
            />
            <Choose
              label="Hospital"
              desc="We will be needing your License information to verify you. Kudos for saving the world!"
              picture="/assets/images/is-hospital.png"
              checked={whoIsIt === "hospital"}
              onChange={() => setWhoIsIt("hospital")}
            />
            <Choose
              label="Ambulance"
              desc="Choose this if you are a super fast driver owning proper license to save people in need"
              picture="/assets/images/is-ambulance.png"
              checked={whoIsIt === "ambulance"}
              onChange={() => setWhoIsIt("ambulance")}
            />
          </div>
          <FilledButton className="w-full mt-4" onClick={() => setPageNo(2)}>
            Proceed
          </FilledButton>
          <div className="mt-4 mx-auto text-xs" style={{ color: "#888888" }}>
            Please choose this information carefully, you can’t revert this ever
            again.
          </div>
        </div>
      ) : (
        <div className="mt-2 p-4 px-6 h-full">
          <div className="flex items-center space-x-4">
            <CircleIconButton
              // className="mt-4 ml-2"
              icon={<FaArrowLeft />}
              onClick={() => setPageNo(1)}
            />
            <div className="text-2xl font-semibold capitalize">
              {whoIsIt} Onboarding
            </div>
          </div>
          <div className="mt-4 mb-6 text-sm" style={{ color: "#888888" }}>
            We need some basic data about you. This data will be shared with
            your doctor/hospital when a treatment starts.
          </div>
          {whoIsIt === "patient" && <UserOnboarding />}
          {whoIsIt === "doctor" && <DoctorOnboarding />}
          {whoIsIt === "hospital" && <HospitalOnboarding />}
          {whoIsIt === "ambulance" && <AmbulanceOnboarding />}
        </div>
      )}
    </div>
  );
}

export default Onboarding;
