import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Hospital() {
  const { signOut } = useAuth();
  return (
    <div>
      <div>Hey, hospital</div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Hospital;
