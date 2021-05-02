import React, { useCallback, useEffect, useState } from "react";
import { FiSend, FiAlertTriangle } from "react-icons/fi";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../screens/Loading";
import getAge from "../../utils/age";

function Home() {
  const history = useHistory();
  const { whoAmi, getIdToken } = useAuth();
  const [treatments, setTreatments] = useState(null);

  const fetchTreatments = useCallback(async () => {
    const { data } = await fetch("https://api.healthbay.us/doctor/treatment", {
      headers: {
        authorization: "Bearer " + (await getIdToken()),
      },
    }).then((r) => r.json());

    if (data === "INVALID TREATMENT ID") setTreatments([]);

    setTreatments(data.filter((d) => !d.closes));
  }, [getIdToken, setTreatments]);

  useEffect(() => {
    fetchTreatments();
  }, [fetchTreatments]);

  if (treatments && treatments.length > 0)
    return (
      <div className="flex flex-col items-center w-full p-4">
        {/* <img
          src="/assets/images/covid19.png"
          alt="Covid 19 alert"
          className="w-full"
        /> */}
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
        <div className="self-start text-2xl font-medium mt-4">
          Ongoing Treatments
        </div>
        <ul className="w-full mt-2">
          {treatments.map((t, i) => (
            <li
              key={i}
              className="relative bg-primary p-4 rounded-md w-full flex flex-row items-center shadow space-x-4 hover:shadow-lg cursor-pointer"
              onClick={() => history.push("/treatment/" + t.treatment_id)}
            >
              <img
                src={t.patient.picture}
                alt="Patient"
                className="w-20 rounded-full border-4 border-white"
              />
              <div className="text-white">
                <div className="text-lg">{t.patient.name}</div>
                <div className="italic text-sm">
                  Age: {getAge(t.patient.dob)} years
                </div>
                <div className="text-sm italic">
                  Blood Group: {t.patient.blood_group}
                </div>
              </div>
              <FiSend className="absolute top-4 right-4 text-white" />
            </li>
          ))}
        </ul>
      </div>
    );
  else if (treatments === null) return <Loading nohscreen />;
  else
    return (
      <div className="flex flex-col items-center justify-center space-y-4 mx-4">
        <img
          src="/assets/images/wave.gif"
          alt="Waving"
          className="h-28 rounded-md p-1 border-4 border-primary border-dashed"
        />
        <div className="text-2xl font-medium">
          Hey, Dr {whoAmi.profile.name}!
        </div>
        <div className="">
          You haven't received any treatment request yet. Kindly keep an eye on
          this page to stay updated when any treatment starts!
        </div>
      </div>
    );
}

export default Home;
