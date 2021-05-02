import React, { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { io } from "socket.io-client";

import { useAuth } from "../../../contexts/AuthContext";

function Device() {
  const { getIdToken, whoAmi } = useAuth();

  useEffect(() => {
    if (whoAmi.profile.device_id) {
      const socket = io("https://api.healthbay.us");

      socket.on("healthbay/hrtspo2-0f2dc/hrtspo2", (msg) => {
        console.log(msg);
      });

      return () => socket.disconnect();
    }
  }, [whoAmi]);

  const addDevice = async () => {
    const id = window.prompt(
      "What's your Device ID?\nYou will find it on the back of the HRTSPO2 Sensor."
    );

    if (!id) return;

    const idToken = await getIdToken();

    try {
      const res = await fetch("https://api.healthbay.us/user/add-oxymeter", {
        method: "POST",
        headers: {
          authorization: "Bearer " + idToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oxymeter_id: id,
        }),
      }).then((r) => r.json());

      if (res.status === "OK") window.location.reload();
      else throw new Error();
    } catch {
      alert("Failed to add device, retry");
    }
  };

  return (
    <div className="bg-secondary h-56 flex flex-row items-center justify-center text-white">
      {whoAmi.profile.device_id ? (
        <>Live Data</>
      ) : (
        <div className="bg-white bg-opacity-25 px-4 py-1 rounded-full text-white flex items-center space-x-2 hover:bg-opacity-50 cursor-pointer">
          <FiPlusCircle />
          <div onClick={addDevice}>Add your device</div>
        </div>
      )}
    </div>
  );
}

export default Device;
