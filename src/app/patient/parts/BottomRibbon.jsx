import React from "react";
import { FiClipboard, FiHome, FiMap, FiUser } from "react-icons/fi";

import { useHistory } from "react-router";

function BottomRibbon() {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className="relative">
      <div className="absolute bg-theme-red w-20 h-20 rounded-full flex items-center justify-center text-xl font-semibold top-0 left-1/2 -ml-10 -mt-10 border-4 border-white text-white">
        SOS
      </div>
      <div className="bg-secondary h-20 flex flex-row items-center justify-center space-x-8 text-white text-2xl shadow-inner">
        <div
          className="relative cursor-pointer"
          onClick={() => history.push("/")}
        >
          <FiHome />
          {path === "/" && (
            <div className="absolute bottom-0 left-1/2 -ml-1 -mb-4 w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => history.push("/treatments")}
        >
          <FiClipboard />
          {path === "/treatments" && (
            <div className="absolute bottom-0 left-1/2 -ml-1 -mb-4 w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div
          className="relative cursor-pointer"
          onClick={() => history.push("/nearby")}
        >
          <FiMap />
          {path === "/nearby" && (
            <div className="absolute bottom-0 left-1/2 -ml-1 -mb-4 w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => history.push("/profile")}
        >
          <FiUser />
          {path === "/profile" && (
            <div className="absolute bottom-0 left-1/2 -ml-1 -mb-4 w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BottomRibbon;
