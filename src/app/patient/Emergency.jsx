import React, { useEffect, useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";

import { useAuth } from "../../contexts/AuthContext";
import FilledButton from "../../components/FilledButton";

const iconOptions = {
  iconSize: [40, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
};

const ambulanceIcon = L.icon({
  iconUrl: "/assets/icons/ambulance.png",
  ...iconOptions,
});

function Emergency() {
  const { whoAmi, getIdToken } = useAuth();

  const [map, setMap] = useState(null);
  const [markerLoc, setMarkerLoc] = useState(null);
  const [ambuLoc, setAmbuLoc] = useState(null);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const x = [position.coords.latitude, position.coords.longitude];
        map.flyTo(x);
        setMarkerLoc(x);
      });
    }
  }, [map, setMarkerLoc]);

  const startEmergency = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const x = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        await fetch("https://api.healthbay.us/user/emergency", {
          method: "POST",
          headers: {
            authorization: "Bearer " + (await getIdToken()),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location: JSON.stringify(x) }),
        });

        window.location.reload();
      });
    }
  }, [getIdToken]);

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

  useEffect(() => {
    const socket = io("https://api.healthbay.us/ambLocation");
    socket.on("ambulance-location", (dt) => {
      if (dt.id === whoAmi.profile.emergency_ambulance) {
        setAmbuLoc(JSON.parse(dt.loc));
      }
    });
    return () => socket.disconnect();
  }, [whoAmi, setAmbuLoc]);

  const goToHospital = async (hosId) => {
    await fetch("https://api.healthbay.us/user/emergency/add-hospital", {
      method: "POST",
      headers: {
        authorization: "Bearer " + (await getIdToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hospital_id: hosId }),
    }).then((x) => x.json());

    window.location.reload();
  };

  const closeEmergency = async () => {
    await fetch("https://api.healthbay.us/user/emergency", {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + (await getIdToken()),
      },
    }).then((x) => x.json());

    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full p-2">
      <div
        className={`text-white mx-4 text-center p-1 rounded-md uppercase mb-4 ${
          whoAmi.profile.emergency ? "bg-theme-red" : "bg-primary"
        }`}
      >
        {whoAmi.profile.emergency ? "Under Emergency" : "Emergency"}
      </div>
      <MapContainer
        className="h-64 rounded-md"
        whenCreated={setMap}
        center={[43.6577, -79.3788]}
        zoom={12}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerLoc && <Marker position={markerLoc} />}
        {ambuLoc && <Marker icon={ambulanceIcon} position={ambuLoc} />}
      </MapContainer>
      <div className="text-sm text-gray-700 mt-4 px-4">
        {whoAmi.profile.emergency
          ? "Please stay calm while your ambulance arrives, the status of which, you can see above. In the meantime, you can choose which hospital to go to from the nearby hospitals listed below:"
          : "In case of any emergency, please requets an ambulance right now! We will find the ambulance nearest to you asap!"}
      </div>
      {whoAmi.profile.emergency &&
        !whoAmi.profile.emergency_hospital &&
        hospitals && (
          <ul className="mx-4 mt-4">
            {hospitals.map((h, i) => (
              <li
                className="bg-primary-lighter p-2 rounded-md cursor-pointer flex flex-row items-center justify-between"
                key={i}
              >
                <div className="">
                  <div className="text-primary font-medium">{h.name}</div>
                  <div className="">Available Beds: {h.bed_capacity}</div>
                </div>
                <div
                  onClick={async () => await goToHospital(h.id)}
                  className="uppercase text-sm bg-primary text-white p-1 px-2 rounded"
                >
                  go
                </div>
              </li>
            ))}
          </ul>
        )}
      {whoAmi.profile.emergency_hospital && hospitals && (
        <div className="mx-4 mt-4">
          <div className="">Going to hospital:</div>
          <div className="bg-primary-lighter p-2 rounded-md cursor-pointer flex flex-row items-center justify-between">
            <div className="">
              <div className="text-primary font-medium">
                {
                  hospitals.find(
                    (h) =>
                      String(h.id) === String(whoAmi.profile.emergency_hospital)
                  ).name
                }
              </div>
              <div className="">
                Available Beds:{" "}
                {
                  hospitals.find(
                    (h) =>
                      String(h.id) === String(whoAmi.profile.emergency_hospital)
                  ).bed_capacity
                }
              </div>
            </div>
          </div>
        </div>
      )}
      {whoAmi.profile.emergency ? (
        <FilledButton className="mt-4 mx-4" onClick={closeEmergency}>
          Close Emergency
        </FilledButton>
      ) : (
        <FilledButton className="mt-4 mx-4" onClick={startEmergency}>
          Request Ambulance
        </FilledButton>
      )}
    </div>
  );
}

export default Emergency;
