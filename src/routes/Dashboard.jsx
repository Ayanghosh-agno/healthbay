import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { signOut } = useAuth();
  return (
    <div>
      Dashboard
      <br />
      <button className="bg-gray-300 px-4 py-2 rounded" onClick={signOut}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
