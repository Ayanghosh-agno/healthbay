import React, { useCallback, useEffect, useState } from "react";

import FilledButton from "../../components/FilledButton";
import Data from "../../components/Data";
import OutlinedButton from "../../components/OutlinedButton";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const { whoAmi, getIdToken, signOut } = useAuth();

  const [inService, setInService] = useState(false);
  const [patient, setPatient] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    if (whoAmi.profile.in_service) setInService(true);
  }, [whoAmi.profile, setInService]);

  const sendLocx = useCallback(() => {
    if (!inService) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const x = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        await fetch("https://api.healthbay.us/ambulance/update-location", {
          method: "POST",
          headers: {
            authorization: "Bearer " + (await getIdToken()),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lox: JSON.stringify(x) }),
        }).then((x) => x.json());
      });
    }
  }, [getIdToken, inService]);

  const checkForPatient = useCallback(async () => {
    if (!inService) return;

    const { status, data } = await fetch(
      "https://api.healthbay.us/ambulance/emergency",
      {
        headers: {
          authorization: "Bearer " + (await getIdToken()),
        },
      }
    ).then((r) => r.json());

    if (status === "OK") setPatient(data);
    else setPatient(null);
  }, [getIdToken, setPatient, inService]);

  useEffect(() => {
    sendLocx();
    const id = setInterval(() => sendLocx(), 5000);

    return () => clearInterval(id);
  }, [sendLocx]);

  useEffect(() => {
    checkForPatient();
    const id = setInterval(() => checkForPatient(), 5000);

    return () => clearInterval(id);
  }, [checkForPatient]);

  useEffect(() => {
    async function fetchNearby() {
      const idToken = await getIdToken();
      const { data } = await fetch(
        "https://api.healthbay.us/user/all-doctors-and-hospitals",
        {
          headers: { authorization: "Bearer " + idToken },
        }
      ).then((x) => x.json());

      setHospitals(data.hospitals);
    }

    fetchNearby();
  }, [getIdToken, setHospitals]);

  const updateStatus = async (status) => {
    await fetch("https://api.healthbay.us/ambulance/service", {
      method: "POST",
      headers: {
        authorization: "Bearer " + (await getIdToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ in_service: status }),
    });
    window.location.reload();
  };

  const chosen_hospital =
    patient && hospitals
      ? hospitals.find((h) => h.id === patient.emergency_hospital)
      : null;

  return (
    <div className="h-screen flex flex-col m-4 items-center justify-center relativ">
      {patient ? (
        <>
          <div className="bg-theme-red-lighter p-1 w-full mb-4 uppercase text-white rounded-full text-center mx-4">
            under emergency
          </div>
          <div className="flex flex-row items-center space-x-4 self-start">
            <img
              src={patient.picture}
              alt="Patient"
              className="mt-2 rounded-full p-2 border-4 border-dashed border-primary w-24"
            />
            <div className="">
              <div className="">Patient Name:</div>
              <div className="text-primary text-lg font-medium">
                {patient.name}
              </div>
            </div>
          </div>
          <Data
            className="mt-4 w-full"
            label="Height"
            value={patient.height + " cms"}
          />
          <Data
            className="mt-4 w-full"
            label="Weight"
            value={patient.weight + " kgs"}
          />
          <Data
            className="mt-4 w-full"
            label="blood group"
            value={patient.blood_group}
          />
          <a
            className="w-full mt-4 bg-primary rounded-lg shadow-md font-semibold px-6 text-white py-2 text-xl flex justify-center items-center"
            href={` https://www.google.com/maps/search/?api=1&query=${
              JSON.parse(patient.emergency_location).lat
            },${JSON.parse(patient.emergency_location).lng}`}
          >
            Directions to Patient
          </a>
          {chosen_hospital && (
            <a
              className="w-full mt-4 bg-primary rounded-lg shadow-md font-semibold px-6 text-white py-2 text-xl flex justify-center items-center"
              href={`https://www.google.com/maps/search/?api=1&query=${chosen_hospital.location.lat},${chosen_hospital.location.lng}`}
            >
              Directions to Chosen Hospital
            </a>
          )}
        </>
      ) : (
        <>
          <div className="">Hey, {whoAmi.profile.vehicle_number}</div>
          <img
            className={`rounded-md justify-center ${
              !inService && "filter grayscale"
            }`}
            src="/assets/images/rado.gif"
            alt="Radar"
          />
          <div className="text-lg mt-6 font-medium text-center">
            {inService
              ? "Searching for people in need"
              : "Look for people in need?"}
          </div>
          <div className="mt-8 text-gray-500 text-center">
            {inService
              ? "Your location is sent to the server so that any patient, when triggers an emergency can be matched with you!"
              : "You are offline. Your location is not being sent to the server. In case you turn online, you'll be able to find patients in need!"}
          </div>
          <FilledButton
            className="mt-8 w-full"
            onClick={() => updateStatus(!inService)}
          >
            Go {inService ? "Offline" : "Online"}
          </FilledButton>
        </>
      )}
      <OutlinedButton className="mb-4 absolute top-4" onClick={signOut}>
        Logout
      </OutlinedButton>
    </div>
  );
}

export default Home;
