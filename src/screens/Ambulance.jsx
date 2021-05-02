import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Ambulance() {
  const { signOut } = useAuth();
  return (
    <div>
      <div>Hey, ambulance</div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Ambulance;
