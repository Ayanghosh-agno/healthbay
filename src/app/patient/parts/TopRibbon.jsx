import React from "react";

import { IoMdExit } from "react-icons/io";

import { useAuth } from "../../../contexts/AuthContext";

function TopRibbon() {
  const { whoAmi, signOut } = useAuth();

  return (
    <header className="p-2 px-4 flex items-center space-x-4 justify-between bg-primary-lighter">
      <img
        className="w-14 h-14 shadow-md rounded-lg"
        src={whoAmi.profile.picture}
        alt="Profile"
      />
      <div>
        <div className="text-xl font-medium">
          Hi {whoAmi.profile.name.split(" ")[0]}!
        </div>
        <div className="text-md -mt-1" style={{ color: "#888" }}>
          how are you feeling today?
        </div>
      </div>
      <div
        className="text-xl text-gray-700 cursor-pointer mr-2"
        onClick={signOut}
      >
        <IoMdExit />
      </div>
    </header>
  );
}

export default TopRibbon;
