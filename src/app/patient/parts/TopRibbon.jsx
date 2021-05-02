import React from "react";

import { FiBell } from "react-icons/fi";

import CircleIconButton from "../../../components/CircleIconButton";

import { useAuth } from "../../../contexts/AuthContext";

function TopRibbon() {
  const { whoAmi } = useAuth();

  return (
    <header className="p-2 px-4 flex items-center space-x-4 justify-between">
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
      <div className="">
        <CircleIconButton className="font-bold relative" icon={<FiBell />}>
          <span className="flex absolute h-2 w-2 top-1 right-1 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </CircleIconButton>
      </div>
    </header>
  );
}

export default TopRibbon;
