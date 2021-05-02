import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Doctor() {
  const { signOut } = useAuth();
  return (
    <div>
      <div>Hey, doctor</div>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Doctor;
