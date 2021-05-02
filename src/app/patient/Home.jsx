import React, { useCallback, useState, useEffect } from "react";
import { FiAlertTriangle, FiSend } from "react-icons/fi";
import { useHistory } from "react-router";

import TreatmentCard from "../../components/TreatmentCard";
import InputField from "../../components/InputField";

import Device from "./parts/Device";

import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const { getIdToken } = useAuth();
  const history = useHistory();
  const [lastTreatment, setLastTreatment] = useState(null);

  const fetchData = useCallback(async () => {
    const { data } = await fetch("https://api.healthbay.us/user/treatments", {
      headers: {
        authorization: "Bearer " + (await getIdToken()),
      },
    }).then((x) => x.json());

    if (data === "INVALID TREATMENT ID") return setLastTreatment(null);
    setLastTreatment(data.length > 0 ? data[0] : null);
  }, [setLastTreatment, getIdToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Device />
      <div
        className="h-6 rounded-full -mt-3 relative"
        style={{
          backgroundImage: "url('/assets/images/background.png')",
          backgroundRepeat: true,
          maxWidth: "400px",
        }}
      ></div>
      <div className="px-6 py-2 -mt-2 mb-4">
        <img src="/assets/images/covid19.png" alt="Covid19 Alert" />

        <div className="mt-4 flex flex-col">
          <label className="font-medium text-xl">Having any symptoms?</label>
          <InputField
            className="mt-2 text-md h-10"
            type="text"
            placeholder="Enter symptoms you're facing..."
            onClick={() =>
              history.push("/treatments", {
                symptomClick: true,
              })
            }
          />
        </div>
        {lastTreatment ? (
          <TreatmentCard onClick={() => history.push("/treatments")}>
            <div className="relative px-4 py-3 flex space-x-8 items-center">
              <img
                className="w-20 h-20 rounded ml-2"
                src={lastTreatment.doctor.picture}
                alt="Doctor"
              />
              <div className="text-white">
                <div className="text-lg">{lastTreatment.doctor.name}</div>
                <div className="text-sm mt-1">
                  {lastTreatment.doctor.specialization}
                </div>
                <InputField
                  className="mt-2 text-xs bg-primary bg-opacity-20 text-black placeholder-black border-none"
                  type="text"
                  placeholder="Type a message..."
                />
              </div>
              <FiSend className="absolute top-2 right-2" />
            </div>
          </TreatmentCard>
        ) : (
          <div className="mt-4">
            <div className="font-medium text-xl">Ongoing Treatments</div>
            No ongoing treatments. To start one, go to Maps, choose a doctor and
            start your treatment!
          </div>
        )}
        <div className="mt-4 bg-primary-lighter rounded p-2 shadow-md">
          <div className="bg-theme-red-lighter p-1 flex justify-center items-center text-white text-xs space-x-2 rounded-md w-32">
            <FiAlertTriangle className="font-bold" />
            <div className="uppercase">covid19 alert</div>
          </div>
          <div className="text-primary text-sm text-justify mt-1">
            Please wear a mask all the time. Stay at least 6 feet apart from
            others. Times are tough but we have to be strong. If you have any
            symptoms, visit your doctor online right now!
          </div>
        </div>
        <img
          className="mt-4"
          src="/assets/images/health-priority.png"
          alt="Your health is our priority"
          onClick={() => history.push("/treatments")}
        />
      </div>
    </>
  );
}

export default Home;
