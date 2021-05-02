import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiSearch, FiSend, FiSkipBack } from "react-icons/fi";

import FilledButton from "../../components/FilledButton";
import CircleIconButton from "../../components/CircleIconButton";
import OutlinedButton from "../../components/OutlinedButton";
import InputField from "../../components/InputField";
import Treatment from "../../components/Treatment";

import symptomMatcher from "../../utils/symptoms";
import { useAuth } from "../../contexts/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../screens/Loading";

function Treatments(props) {
  const { getIdToken } = useAuth();
  const history = useHistory();
  const havingSymptoms = useRef(null);

  const [symptoms, setSymptoms] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [symptomSubmittedData, setSymptomSubmittedData] = useState(null);
  const [treatments, setTreatments] = useState(null);

  useEffect(() => {
    if (
      props.location.state &&
      props.location.state.symptomClick &&
      havingSymptoms.current
    )
      havingSymptoms.current.focus();
  }, [props.location.state, getIdToken]);

  const symptomsChange = useCallback(() => {
    if (havingSymptoms.current && havingSymptoms.current.value)
      setSymptoms(
        symptomMatcher(havingSymptoms.current.value).filter(
          (s) => !userSymptoms.map((us) => us.value).includes(s.value)
        )
      );
    else setSymptoms([]);
  }, [setSymptoms, userSymptoms]);

  useEffect(() => {
    symptomsChange();
  }, [userSymptoms, symptomsChange]);

  const fetchData = useCallback(async () => {
    const { data } = await fetch("https://api.healthbay.us/user/treatments", {
      headers: {
        authorization: "Bearer " + (await getIdToken()),
      },
    }).then((x) => x.json());

    if (data === "INVALID TREATMENT ID") return setTreatments([]);
    setTreatments(data);
  }, [setTreatments, getIdToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const symptomSubmit = async () => {
    setLoading(true);
    const idToken = await getIdToken();
    const { data } = await fetch(
      "https://api.healthbay.us/user/disease-from-symptoms",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + idToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: userSymptoms.map((s) => s.value) }),
      }
    ).then((x) => x.json());

    const list = [];

    for (let i of Object.getOwnPropertyNames(data)) {
      const x = {
        disease: i,
        description: data[i].Description,
        precautions: [
          data[i].Precaution_1,
          data[i].Precaution_2,
          data[i].Precaution_3,
          data[i].Precaution_4,
        ],
        probability: data[i].Probability,
      };

      list.push(x);
    }

    const sortedList = list.sort(
      (a, b) =>
        Number(b.probability.substring(0, b.probability.length - 1)) -
        Number(a.probability.substring(0, a.probability.length - 1))
    );

    setSymptomSubmittedData(sortedList);
    setLoading(false);
  };

  if (symptomSubmittedData)
    return (
      <div className="m-4 mb-8">
        <CircleIconButton
          className="mt-4 mb-4"
          icon={<FaArrowLeft />}
          onClick={() => setSymptomSubmittedData(null)}
        />
        <div className="text-2xl font-medium border-b-2 border-primary pb-2">
          Disease Probability Identification Based on Your Symptoms
        </div>
        <div className="mt-4 uppercase text-sm rounded-full px-2 py-1 bg-theme-red-lighter text-white text-center">
          Not Medical Advice
        </div>
        <div className="mt-4">
          <div className="font-medium text-lg">Your Symptoms:</div>
          <ul className="ml-5">
            {userSymptoms.map((us) => (
              <li className="list-disc" key={us.value}>
                {us.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <div className="font-medium text-lg">Probable Diseases:</div>
          <ul className="">
            {symptomSubmittedData.map((s, i) => (
              <li
                className="bg-primary-lighter rounded-md my-2 p-1 flex flex-row items-start justify-between"
                key={i}
              >
                <div className="">
                  <div className="text-primary font-semibold text-lg px-1 underline">
                    {s.disease}
                  </div>
                  <div className="text-xs p-1">{s.description}</div>
                  <div className="text-sm px-1">Precautions:</div>
                  <ul className="ml-6">
                    {s.precautions
                      .filter((sp) => !!sp)
                      .map((sp) => (
                        <li className="list-disc px-1 text-xs my-1 rounded">
                          {sp}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="text-primary italic">{s.probability}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs mt-2 text-center" style={{ color: "#888" }}>
          Please note that this is not medical advice and should not be treated
          as one. If you have these symptoms, please reach out to a doctor. This
          is just a guess of what you might have but AI is no doctor.
        </div>
      </div>
    );
  else
    return (
      <div className="px-4 mb-4">
        <div className="mt-4 flex flex-col">
          <label className="font-medium text-xl" htmlFor="symptoms">
            Having any symptoms?
          </label>
          <InputField
            className="mt-2 text-md h-10"
            type="text"
            id="symptoms"
            ref={havingSymptoms}
            placeholder="Enter symptoms you're facing..."
            onChange={symptomsChange}
          />
        </div>
        {symptoms.length === 0 && userSymptoms.length === 0 ? (
          <>
            <div className="mt-4 flex flex-col">
              <label className="font-medium text-xl" htmlFor="find-doc">
                Find your doctor
              </label>
              <InputField
                className="mt-2 text-md h-10"
                type="text"
                id="find-doc"
                placeholder="Search using name, profession..."
                onClick={() =>
                  history.push("/nearby", {
                    findDocClick: true,
                  })
                }
              />
            </div>
            <div className="mt-4 flex flex-col">
              <div className="font-medium text-xl">Ongoing Treatments</div>
              <div className="text-sm" style={{ color: "#888" }}>
                You can track your ongoing treatments from this page. All your
                doctors will show up here. Please note that they can see your
                live heart and sensor monitors when it is connected and pinging!
              </div>
            </div>
            <>
              {treatments === null ? (
                <Loading nohscreen className="mt-6" />
              ) : treatments.length === 0 ? (
                <div className="mt-2">No treatments found</div>
              ) : (
                <>
                  {treatments
                    .sort((a, b) => a.closes - b.closes)
                    .map((t, i) => (
                      <Treatment closed={t.closes}>
                        <div
                          className="relative px-4 py-3 flex space-x-8 items-center"
                          onClick={() =>
                            history.push("/treatment/" + t.treatment_id)
                          }
                        >
                          <img
                            className="w-16 h-16 rounded ml-2"
                            src={t.doctor.picture}
                            alt="Doctor"
                          />
                          <div className="text-white">
                            <div className="text-lg">{t.doctor.name}</div>
                            <div className="text-sm">
                              {t.doctor.specialization}
                            </div>
                            <InputField
                              className="mt-2 text-xs bg-primary bg-opacity-20 text-black placeholder-black border-none"
                              type="text"
                              placeholder="Type a message..."
                              onClick={() =>
                                history.push("/treatment/" + t.treatment_id)
                              }
                            />
                          </div>
                          <FiSend className="absolute top-2 right-2" />
                        </div>
                      </Treatment>
                    ))}
                </>
              )}
            </>
          </>
        ) : (
          <>
            <div className="">
              {symptoms.map((s) => (
                <div
                  className="bg-primary-lighter px-2 py-1 my-1 cursor-pointer"
                  key={s.value}
                  onClick={() => setUserSymptoms((us) => [...us, s])}
                >
                  {s.label}
                </div>
              ))}
            </div>
            {userSymptoms.length > 0 ? (
              <div className="">
                <div className="mt-2">Your Symptoms:</div>
                <div>
                  {userSymptoms.map((s) => (
                    <div
                      className="bg-primary px-2 py-1 my-1 text-white rounded-md relative cursor-pointer"
                      key={s.value}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
                <FilledButton
                  className="space-x-2 w-full mt-4"
                  loading={loading}
                  onClick={symptomSubmit}
                >
                  <FiSearch />
                  <div className="">Search</div>
                </FilledButton>
                <OutlinedButton
                  className="space-x-2 w-full mt-4"
                  loading={loading}
                  onClick={() => {
                    havingSymptoms.current.value = "";
                    setUserSymptoms([]);
                    setSymptoms([]);
                  }}
                >
                  <FiSkipBack />
                  <div className="">Clear & Go Back</div>
                </OutlinedButton>
              </div>
            ) : (
              <>No symptoms added</>
            )}
            <div className="text-xs mt-2 text-center" style={{ color: "#888" }}>
              Please note that this is not medical advice and should not be
              treated as one. If you have these symptoms, please reach out to a
              doctor. This is just a guess of what you might have but AI is no
              doctor.
            </div>
          </>
        )}
      </div>
    );
}

export default Treatments;
