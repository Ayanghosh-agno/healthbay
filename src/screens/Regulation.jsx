import React, { useEffect, useState, useCallback } from "react";

import Logo from "../components/Logo";

import { useAuth } from "../contexts/AuthContext";

function Regulation() {
  const [loading, setLoading] = useState(true);
  const [hbData, setHbData] = useState([]);

  const { getIdToken, signOut } = useAuth();

  const getUnverifiedUsers = useCallback(async () => {
    setLoading(true);
    const idToken = await getIdToken();

    const res = await fetch("https://api.healthbay.us/unverified", {
      headers: { authorization: "Bearer " + idToken },
    }).then((r) => r.json());

    setLoading(false);
    setHbData(res.data);
  }, [getIdToken, setLoading, setHbData]);

  const verifyUser = async (type, id) => {
    const idToken = await getIdToken();
    type = type.toUpperCase();
    id = Number(id);

    await fetch("https://api.healthbay.us/verify", {
      method: "POST",
      body: JSON.stringify({ id, type }),
      headers: {
        authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
    });

    await getUnverifiedUsers();
  };

  useEffect(() => {
    getUnverifiedUsers();
  }, [getUnverifiedUsers]);

  return (
    <div className="flex flex-col space-y-4 items-start px-4 h-screen">
      <Logo />
      <div className="text-2xl font-medium pt-4 underline">Regulation</div>
      <div className="text-xl">All Unverified Users</div>
      <div className="w-full">
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {hbData.length === 0 && <>No doctors/hospital/ambulance found</>}
            {hbData.map((d, indx) => (
              <div className="bg-primary-lighter p-2" key={indx}>
                <div className="uppercase text-green-100 bg-green-600 w-24 rounded flex flex-col items-center">
                  {d.type}
                </div>
                <div className="mt-1 text-lg">{d.name}</div>
                <div className="text-sm">License Number: {d.license_no}</div>
                <div className="text-sm">
                  License Document:{" "}
                  <a
                    className="text-blue-700 cursor-pointer"
                    href={d.license_photo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open Document
                  </a>
                </div>
                <button
                  className="text-md bg-primary p-1 px-4 rounded text-white mt-2"
                  onClick={() => verifyUser(d.type, d.id)}
                >
                  Verify
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <button
        className="px-4 py-1 bg-primary text-white rounded-lg uppercase"
        onClick={signOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default Regulation;
