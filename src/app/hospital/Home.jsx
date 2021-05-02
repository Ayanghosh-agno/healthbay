import React, { useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import FilledButton from "../../components/FilledButton";
import Data from "../../components/Data";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const { whoAmi, getIdToken, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateBeds = useCallback(
    async (beds) => {
      setLoading(true);

      await fetch("https://api.healthbay.us/hospital/beds", {
        method: "PUT",
        headers: {
          authorization: "Bearer " + (await getIdToken()),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filled_beds: beds }),
      });

      window.location.reload();
    },
    [getIdToken]
  );

  return (
    <div className="h-screen flex flex-col m-4 items-center justify-center relativ">
      <FilledButton className="mb-4 -mt-10" onClick={signOut}>
        Logout
      </FilledButton>
      <div className="bg-theme-red-lighter p-1 w-full mb-4 uppercase text-white rounded-full text-center mx-4">
        hospital
      </div>
      <img
        src="/assets/icons/hospital.png"
        alt="Patient"
        className="mt-2 rounded-full p-2 border-4 border-dashed border-primary w-24"
      />
      <div className="relative flex flex-row mb-4">
        <div className="text-2xl font-medium">{whoAmi.profile.name}</div>
        {whoAmi.profile.verified && (
          <img
            src="/assets/images/verified.jpg"
            alt="Verified"
            className="absolute top-0 right-0 -mr-8 w-8 h-8 rounded-full"
          />
        )}
      </div>
      <MapContainer
        className="h-64 rounded-md w-screen"
        center={whoAmi.profile.location}
        zoom={12}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={whoAmi.profile.location} />
      </MapContainer>
      <Data
        className="my-4 w-40"
        label="Free Beds"
        value={whoAmi.profile.bed_capacity}
      />
      <div className="flex flex-row space-x-4">
        <FilledButton
          loading={loading}
          className="rounded-md shadow hover:shadow-md text-center text-2xl w-40 py-2 bg-primary text-white font-medium cursor-pointer flex flex-col items-center justify-center"
          onClick={() =>
            whoAmi.profile.bed_capacity > 1 &&
            updateBeds(Number(whoAmi.profile.bed_capacity) + 1)
          }
        >
          +1 Free
        </FilledButton>
        <FilledButton
          loading={loading}
          className="rounded-md shadow hover:shadow-md text-center text-2xl w-40 py-2 bg-primary text-white font-medium cursor-pointer flex flex-col items-center justify-center"
          onClick={() =>
            whoAmi.profile.bed_capacity > 1 &&
            updateBeds(Number(whoAmi.profile.bed_capacity) - 1)
          }
        >
          -1 Free
        </FilledButton>
      </div>
    </div>
  );
}

export default Home;
