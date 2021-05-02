import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import DropdownInput from "../components/DropdownInput";
import FilledButton from "../components/FilledButton";
import InputField from "../components/InputField";
import { useAuth } from "../contexts/AuthContext";

const specialization_values = [
  "Anatomical Pathology",
  "Anesthesiology",
  "Cardiology",
  "Cardiovascular/Thoracic Surgery",
  "Clinical Immunology/Allergy",
  "Critical Care Medicine",
  "Dermatology",
  "Diagnostic Radiology",
  "Emergency Medicine",
  "Endocrinology and Metabolism",
  "Family Medicine",
  "Gastroenterology",
  "General Internal Medicine",
  "General Surgery",
  "General/Clinical Pathology",
  "Geriatric Medicine",
  "Hematology",
  "Medical Biochemistry",
  "Medical Genetics",
  "Medical Microbiology and Infectious Diseases",
  "Medical Oncology",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Nuclear Medicine",
  "Obstetrics/Gynecology",
  "Occupational Medicine",
  "Ophthalmology",
  "Orthopedic Surgery",
  "Otolaryngology",
  "Pediatrics",
  "Physical Medicine and Rehabilitation (PM & R)",
  "Plastic Surgery",
  "Psychiatry",
  "Public Health and Preventive Medicine (PhPm)",
  "Radiation Oncology",
  "Respirology",
  "Rheumatology",
  "Urology",
];

const timings_day_values = [
  "Everyday",
  "Mon - Fri",
  "Mon - Sat",
  "Sat - Sun",
  "Only Monday",
  "Only Tuesday",
  "Only Wesnesday",
  "Only Thursday",
  "Only Friday",
  "Only Saturday",
  "Only Sunday",
];

const timings_time_values = [
  "9AM - 9PM",
  "12PM - 9PM",
  "3PM - 9PM",
  "6PM - 7PM",
  "6PM - 8PM",
  "6PM - 9PM",
];

function DoctorOnboarding() {
  const name = useRef(null);
  const license_no = useRef(null);
  const license_document = useRef(null);
  const specialization = useRef(null);
  const picture = useRef(null);
  const hospital = useRef(null);
  const timings_day = useRef(null);
  const timings_time = useRef(null);
  const contact = useRef(null);

  const [showHospital, setShowHospital] = useState(false);
  const [validationErr, setValidationErr] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(null);
  const [markerLoc, setMarkerLoc] = useState(null);

  const { idToken, currentUser } = useAuth();

  useEffect(() => {
    async function fetchHospitals() {
      const res = await fetch("https://api.healthbay.us/hospitals", {
        headers: { authorization: "Bearer " + idToken },
      }).then((r) => r.json());
      setHospitals(res.data.map((h) => ({ value: h.id, label: h.name })));
    }

    fetchHospitals();
  }, [setHospitals, idToken]);

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const x = [position.coords.latitude, position.coords.longitude];
        map.flyTo(x);
        setMarkerLoc(x);
      });
    }

    map.on("click", (e) => {
      setMarkerLoc(e.latlng);
    });
  }, [map, setMarkerLoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name.current.value);
      formData.append("license_no", license_no.current.value);
      formData.append("license_doc", license_document.current.files[0]);
      formData.append("specialization", specialization.current.value);
      formData.append("picture", picture.current.files[0]);
      if (showHospital) formData.append("hospital", hospital.current.value);
      else formData.append("chamber_location", JSON.stringify(markerLoc));
      formData.append(
        "timings",
        timings_day.current.value + ", " + timings_time.current.value
      );
      formData.append("contact", contact.current.value);

      const idToken = await currentUser.getIdToken();

      await fetch("https://api.healthbay.us/onboarding/doctor", {
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
      <div className="flex flex-col mb-4 relative">
        <label className="font-semibold uppercase" htmlFor="specialization">
          Specialization
        </label>
        <DropdownInput
          lvalues={specialization_values}
          id="specialization"
          ref={specialization}
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
      <div className="flex mt-2 mb-4 space-x-4">
        <div
          className={`py-1 px-2 rounded-lg cursor-pointer ${
            showHospital
              ? "bg-primary-lighter text-text-color-theme"
              : "bg-primary text-white"
          }`}
          onClick={() => setShowHospital(false)}
        >
          Personal Chamber
        </div>
        <div
          className={`py-1 px-2 rounded-lg cursor-pointer ${
            showHospital
              ? "bg-primary text-white"
              : "bg-primary-lighter text-text-color-theme"
          }`}
          onClick={() => setShowHospital(true)}
        >
          Hospital
        </div>
      </div>
      {showHospital ? (
        <>
          <div className="flex flex-col mb-4 relative">
            <label className="font-semibold uppercase" htmlFor="hospital">
              Hospital
            </label>
            <DropdownInput options={hospitals} id="hospital" ref={hospital} />
          </div>
        </>
      ) : (
        <div className="flex flex-col mb-4">
          <label className="font-semibold uppercase">Chamber Location</label>
          <label className="text-xs mb-2">
            Please tap on the map where your personal chamber is.
          </label>
          <MapContainer
            className="h-64 rounded-md"
            whenCreated={setMap}
            center={[43.6577, -79.3788]}
            zoom={12}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markerLoc && <Marker position={markerLoc} />}
          </MapContainer>
        </div>
      )}
      <div className="flex flex-col mb-4 relative">
        <label className="font-semibold uppercase" htmlFor="timings_day">
          Timings
        </label>
        <DropdownInput
          lvalues={timings_day_values}
          id="timings_day"
          ref={timings_day}
        />
        <DropdownInput
          lvalues={timings_time_values}
          id="timings_time"
          ref={timings_time}
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

export default DoctorOnboarding;
