import React, { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

import NotFound from "../../screens/404";
import Loading from "../../screens/Loading";

import CircleIconButton from "../../components/CircleIconButton";
import FilledButton from "../../components/FilledButton";

function Doctor(props) {
  const history = useHistory();
  const { getIdToken } = useAuth();
  const docId = props.match.params.docId;

  const [doc, setDoc] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetch(
        "https://api.healthbay.us/user/all-doctors-and-hospitals",
        {
          headers: {
            authorization: "Bearer " + (await getIdToken()),
          },
        }
      ).then((x) => x.json());

      const doc = data.doctors
        .map((d) => {
          if (d.hospital_id)
            return {
              ...d,
              hospital: data.hospitals.find(
                (h) => String(h.id) === d.hospital_id
              ),
            };
          else return d;
        })
        .find((d) => String(d.id) === docId);
      setDoc(doc);
    }

    fetchData();
  }, [docId, getIdToken, setDoc]);

  const startTreatmentWithDoc = async () => {
    setLoading(true);
    const { data } = await fetch(
      "https://api.healthbay.us/user/start-treatment",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + (await getIdToken()),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor: Number(docId),
        }),
      }
    ).then((x) => x.json());

    history.push("/treatment/" + data.id);
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-full p-4">
      <CircleIconButton
        className="mt-4 z-10 self-start ml-2"
        icon={<FaArrowLeft />}
        onClick={() => history.goBack()}
      />
      {doc === false ? (
        <Loading />
      ) : doc === undefined ? (
        <NotFound />
      ) : (
        <>
          <img
            className="w-40 rounded-full border-4 border-dashed p-2 shadow border-primary"
            src={doc.picture}
            alt="Doctor"
          />
          <div className="text-2xl mt-4 font-semibold">{doc.name}</div>
          <div className="flex space-x-2 items-center text-primary">
            <FiPhone />
            <a href={`tel:${doc.contact}`} className="">
              {doc.contact}
            </a>
          </div>
          <div className="mt-2">Specialization: {doc.specialization}</div>
          <div className="">
            Chamber:{" "}
            {doc.hospital_id ? (
              <a
                className="text-primary"
                href={`https://www.google.com/maps/search/?api=1&query=${doc.hospital.location[0]},${doc.hospital.location[1]}`}
              >
                Hospital {doc.hospital.name}
              </a>
            ) : (
              <a
                className="text-primary"
                href={`https://www.google.com/maps/search/?api=1&query=${
                  JSON.parse(doc.chamber_location).lat
                },${JSON.parse(doc.chamber_location).lng}`}
              >
                Personal Chamber
              </a>
            )}
          </div>
          <div className="">Timings: {doc.timings}</div>
          {props.location.state && props.location.state.doNotStartTreatment ? (
            <></>
          ) : (
            <>
              <FilledButton
                className="mt-6 w-full"
                loading={loading}
                onClick={startTreatmentWithDoc}
              >
                Start Treatment
              </FilledButton>
              <div className="text-gray-500 text-xs text-center mt-4">
                By starting a treatment, you agree to share your medical history
                and live details as long as the treatment is going on
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Doctor;
