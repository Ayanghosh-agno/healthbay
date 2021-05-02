import React, { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../screens/Loading";

import Data from "../../components/Data";
import Device from "./parts/Device";

function Patient(props) {
  const patientId = props.match.params.patientId;
  const { getIdToken } = useAuth();
  const [patient, setPatient] = useState(null);

  console.log(patientId);

  useEffect(() => {
    async function fetchData() {
      let pt = {};

      {
        const { data } = await fetch(
          "https://api.healthbay.us/user/profile/" + patientId,
          {
            headers: {
              authorization: "Bearer " + (await getIdToken()),
            },
          }
        ).then((r) => r.json());

        pt = { ...pt, ...data };
      }

      {
        const { data } = await fetch(
          "https://api.healthbay.us/user/medical-history/" + patientId,
          {
            headers: {
              authorization: "Bearer " + (await getIdToken()),
            },
          }
        ).then((r) => r.json());

        pt = { ...pt, medical_history: data };
      }

      setPatient(pt);
    }

    fetchData();
  }, [setPatient, patientId, getIdToken]);

  return patient ? (
    <div className="flex flex-col justify-center items-center mx-6">
      <img
        className="w-40 rounded-full border-4 border-dashed p-2 shadow border-primary"
        src={patient.picture}
        alt="Doctor"
      />
      <div className="text-2xl mt-4 font-semibold">{patient.name}</div>
      <div className="flex space-x-2 items-center text-primary">
        <FiPhone />
        <a href={`tel:${patient.contact}`} className="">
          {patient.contact}
        </a>
      </div>
      <Device device_id={patient.device_id} />
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
      <div className="text-xl font-semibold mt-6">Medical History</div>
      <>
        {patient.medical_history.length === 0 ? (
          <>
            No medical history added, tap add below to create medical history
            records you had.
          </>
        ) : (
          <ul>
            {patient.medical_history.map((mh, i) => (
              <li className="bg-primary-lighter rounded my-2 p-2" key={i}>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-lg font-medium">{mh.title}</div>
                  <div className="bg-primary text-white px-2 rounded-full">
                    {mh.type}
                  </div>
                </div>
                <div className="text-sm text-primary font-semibold italic">
                  {mh.year}
                </div>
                <div className="mt-1">{mh.description}</div>
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  ) : (
    <Loading nohscreen />
  );
}

export default Patient;
