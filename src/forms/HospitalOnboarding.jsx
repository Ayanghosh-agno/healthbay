import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import FilledButton from "../components/FilledButton";
import InputField from "../components/InputField";

import { useAuth } from "../contexts/AuthContext";

function HospitalOnboarding() {
  const name = useRef(null);
  const license_no = useRef(null);
  const license_document = useRef(null);
  const bed_capacity = useRef(null);
  const contact = useRef(null);

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [validationErr, setValidationErr] = useState(null);

  const [map, setMap] = useState(null);
  const [markerLoc, setMarkerLoc] = useState(null);

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
      formData.append("contact", contact.current.value);
      formData.append("bed_capacity", bed_capacity.current.value);
      formData.append("location", JSON.stringify(markerLoc));

      const idToken = await currentUser.getIdToken();

      await fetch("https://api.healthbay.us/onboarding/hospital", {
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
          Hospital Name
        </label>
        <InputField
          className="mt-1 text-lg"
          type="text"
          id="name"
          ref={name}
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
        <label className="font-semibold uppercase" htmlFor="bedCapacity">
          Bed Capacity
        </label>
        <InputField
          className="mt-1 text-lg"
          type="number"
          id="bedCapacity"
          placeholder="Number of beds at your hospital"
          ref={bed_capacity}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="font-semibold uppercase">Hospital Location</label>
        <label className="text-xs mb-2">
          Please tap on the map where your hospital is.
        </label>
        <MapContainer
          className="h-64 rounded-md"
          whenCreated={setMap}
          center={[51.5074, 0.1278]}
          zoom={12}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markerLoc && <Marker position={markerLoc} />}
        </MapContainer>
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

export default HospitalOnboarding;
