import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useHistory } from "react-router";

import CircleIconButton from "../../components/CircleIconButton";
import InputField from "../../components/InputField";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../screens/Loading";

function Treatment(props) {
  const history = useHistory();
  const { getIdToken } = useAuth();
  const typeMsg = useRef(null);

  const [treatment, setTreatment] = useState(null);
  const [messages, setMessages] = useState(null);

  const trtId = props.match.params.trtId;

  const fetchMessages = useCallback(async () => {
    const res = await fetch(
      "https://api.healthbay.us/user/treatment/" + trtId + "/messages",
      {
        headers: {
          authorization: "Bearer " + (await getIdToken()),
        },
      }
    ).then((x) => x.json());

    setMessages(res.data);
  }, [setMessages, getIdToken, trtId]);

  const fetchData = useCallback(async () => {
    const { data } = await fetch("https://api.healthbay.us/user/treatments", {
      headers: {
        authorization: "Bearer " + (await getIdToken()),
      },
    }).then((x) => x.json());

    const treatment = data.find((d) => String(d.treatment_id) === trtId);

    setTreatment(treatment);
  }, [setTreatment, getIdToken, trtId]);

  useEffect(() => {
    fetchData();
    fetchMessages();

    const id1 = setInterval(() => fetchData(), 2000);
    const id2 = setInterval(() => fetchMessages(), 2000);
    return () => {
      clearInterval(id1);
      clearInterval(id2);
    };
  }, [fetchData, fetchMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!typeMsg.current.value) return;

    const msg = typeMsg.current.value;
    typeMsg.current.value = "";

    if (msg === "/close") {
      await fetch("https://api.healthbay.us/user/treatment/" + trtId, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + (await getIdToken()),
        },
      }).then((x) => x.json());

      await fetchData();
      return;
    }

    await fetch("https://api.healthbay.us/user/treatment/" + trtId + "/chat", {
      method: "POST",
      headers: {
        authorization: "Bearer " + (await getIdToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg, type: "chat" }),
    }).then((x) => x.json());

    await fetchMessages();
  };

  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div className="bg-primary flex flex-row items-center p-2 space-x-4 w-full shadow">
        <CircleIconButton
          className="mx-2"
          icon={<FaArrowLeft />}
          onClick={() => history.goBack()}
        />
        <img
          src={
            treatment
              ? `${treatment.doctor.picture}`
              : "/assets/images/wel-doc.png"
          }
          alt="Your Doctor"
          className="h-14 w-14 rounded-full border-2 border-dashed p-1 shadow border-white cursor-pointer"
          onClick={() => {
            if (treatment)
              history.push("/doctor/" + treatment.doctor.id, {
                doNotStartTreatment: true,
              });
          }}
        />
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            if (treatment)
              history.push("/doctor/" + treatment.doctor.id, {
                doNotStartTreatment: true,
              });
          }}
        >
          <div className="text-xl">
            {treatment ? `${treatment.doctor.name}` : ""}
          </div>
          <div className="text-sm">
            {treatment ? `${treatment.doctor.specialization}` : ""}.
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto w-full">
        {messages ? (
          <>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-items-center space-y-2">
                <img
                  className="w-2/3"
                  src="/assets/images/send-first-msg.png"
                  alt="Send first message"
                />
                <div className="">Send your first message now!</div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full p-2 h-full">
                {messages.map((m, i) => {
                  if (m.type === "chat")
                    return (
                      <div
                        key={i}
                        className={`bg-blue-700 text-white p-1 px-2 max-w-xs rounded-md my-1 ${
                          m.by === 1 ? "self-start" : "self-end"
                        }`}
                      >
                        {m.msg}
                      </div>
                    );
                  else if (m.type === "pres")
                    return (
                      <div
                        key={i}
                        className={`relative pt-10 bg-blue-500 text-white p-3 max-w-xs rounded-md my-1 flex flex-row space-x-4 items-center ${
                          m.by === 1 ? "self-start" : "self-end"
                        }`}
                      >
                        <img
                          src={`/assets/icons/${JSON.parse(m.msg).type}.png`}
                          alt={JSON.parse(m.msg).type}
                          className="w-16 bg-white rounded p-2"
                        />
                        <div className="">
                          <div className="">
                            {JSON.parse(m.msg).particulars}
                          </div>
                          <div className="">{JSON.parse(m.msg).times}</div>
                        </div>
                        <div className="absolute uppercase text-xs top-2 left-0 rounded-full px-2 py-1 bg-theme-red-lighter">
                          prescription
                        </div>
                      </div>
                    );
                  else return <></>;
                })}
                {treatment && treatment.closes && (
                  <div className="mt-4 pt-1 border-t border-gray-400 w-64 text-center opacity-70">
                    Treatment closed
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Loading nohscreen />
        )}
      </div>
      {treatment && !treatment.closes && (
        <form
          onSubmit={sendMessage}
          className="flex relative items-center justify-evenly w-full bg-gray-900 py-4"
        >
          <InputField
            className="text-lg h-10 w-64"
            type="text"
            placeholder="Type a message..."
            ref={typeMsg}
          />
          <CircleIconButton
            bgcolor="bg-primary"
            txtcolor="text-white"
            icon={<FiSend />}
            type="submit"
          />
          <div className="absolute bg-theme-red-lighter -mt-20 w-full text-center text-white text-sm">
            Type <span className="font-mono">/close</span> to close the
            treatment
          </div>
        </form>
      )}
    </div>
  );
}

export default Treatment;
