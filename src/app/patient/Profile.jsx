import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

import Data from "../../components/Data";
import InputField from "../../components/InputField";
import DropdownInput from "../../components/DropdownInput";
import FilledButton from "../../components/FilledButton";

import { useAuth } from "../../contexts/AuthContext";
import { FiPlusCircle, FiX } from "react-icons/fi";

Modal.setAppElement("#root");

const history_types = ["Disease", "Allergy", "Operation"];

function Profile() {
  const { whoAmi, getIdToken } = useAuth();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const type = useRef();
  const title = useRef();
  const desc = useRef();
  const year = useRef();

  const profile = whoAmi.profile;

  useEffect(() => {
    async function fetchMedicalHistory() {
      const idToken = await getIdToken();
      const res = await fetch(
        "https://api.healthbay.us/user/medical-history/" + whoAmi.id,
        {
          headers: {
            authorization: "Bearer " + idToken,
          },
        }
      ).then((r) => r.json());

      setMedicalHistory(res.data);
    }
    fetchMedicalHistory();
  }, [whoAmi, getIdToken, setMedicalHistory]);

  const closeModal = () => setModalIsOpen(false);

  const submitHistory = async () => {
    setLoading(true);
    const idToken = await getIdToken();
    try {
      await fetch("https://api.healthbay.us/user/medical-history", {
        method: "POST",
        headers: {
          authorization: "Bearer " + idToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type.current.value,
          title: title.current.value,
          description: desc.current.value,
          year: year.current.value,
        }),
      }).then((r) => r.json());
      window.location.reload();
    } catch {
      alert("Something went wrong, please retry!");
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 mb-8 mt-4">
      <div className="text-xl font-semibold">Your Profile</div>
      <div className="py-2">
        <Data label="name" value={profile.name} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Data label="height" value={profile.height + " cms"} />
          <Data label="weight" value={profile.weight + " kgs"} />
        </div>
        <Data
          className="mt-4"
          label="blood group"
          value={profile.blood_group}
        />
        <Data
          className="mt-4"
          label="date of birth"
          value={new Date(profile.dob).toDateString()}
        />
        <Data className="mt-4" label="contact" value={profile.contact} />
      </div>
      <div className="text-xl font-semibold mt-6">Medical History</div>
      {medicalHistory === null ? (
        <>Loading...</>
      ) : (
        <>
          {medicalHistory.length === 0 ? (
            <>
              No medical history added, tap add below to create medical history
              records you had.
            </>
          ) : (
            <ul>
              {medicalHistory.map((mh, i) => (
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
      )}
      <FilledButton
        className="w-full mt-2"
        onClick={() => setModalIsOpen(true)}
      >
        Add History
      </FilledButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            maxHeight: "540px",
            marginTop: "auto",
            marginBottom: "auto",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        contentLabel="Medical History Add Modal"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium mb-2">Add Medical History</h2>
          <FiX
            className="text-primary text-xl self-start mt-1 cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col mt-2 relative">
          <label className="text-md" htmlFor="type">
            Type
          </label>
          <DropdownInput lvalues={history_types} id="type" ref={type} />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-md" htmlFor="title">
            Title
          </label>
          <InputField
            className="mt-2 text-md h-10"
            type="text"
            id="title"
            ref={title}
            placeholder="What operation/disease did you undertake?"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-md" htmlFor="desc">
            Description
          </label>
          <InputField
            className="mt-2 text-md h-10"
            type="text"
            id="desc"
            ref={desc}
            placeholder="Describe your situation"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-md" htmlFor="year">
            Year
          </label>
          <InputField
            className="mt-2 text-md h-10"
            type="number"
            id="year"
            ref={year}
            placeholder="Which year did you face this?"
          />
        </div>
        <FilledButton
          loading={loading}
          className="w-full mt-8 font-medium text-lg flex flex-row space-x-3"
          onClick={submitHistory}
        >
          <FiPlusCircle />
          <div className="">Add History</div>
        </FilledButton>
        <div className="text-xs text-grayish-lighter mt-4 mx-2 text-center">
          Please note that this data will be stored in a Blockchain, which is
          why this data can never be edited.
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
