import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";

import { auth } from "../utils/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whoAmi, setWhoAmi] = useState(null);
  const [idToken, setIdToken] = useState(null);

  const history = useHistory();

  async function regEmail(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function signInEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function regGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  }

  async function getIdToken() {
    return await currentUser.getIdToken();
  }

  async function signOut() {
    await auth.signOut();
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return history.push("/welcome");
      }

      const iToken = await user.getIdToken();

      try {
        const res = await fetch("https://api.healthbay.us/whoami", {
          headers: { authorization: "Bearer " + iToken },
        }).then((r) => r.json());

        if (res.status === "OK") setWhoAmi(res);

        let url = null;

        switch (res.type) {
          case "PATIENT":
            url = "https://api.healthbay.us/user/profile/" + res.id;
            break;
          case "DOCTOR":
            url = "https://api.healthbay.us/doctor/profile/" + res.id;
            break;
          case "HOSPITAL":
            url = "https://api.healthbay.us/hospital/profile/" + res.id;
            break;
          case "AMBULANCE":
            url = "https://api.healthbay.us/ambulance/profile/" + res.id;
            break;
          default:
            url = null;
        }

        if (url) {
          const { data } = await fetch(url, {
            headers: { authorization: "Bearer " + iToken },
          }).then((r) => r.json());

          setWhoAmi({ ...res, profile: data });
        }
      } catch {
        setWhoAmi(null);
      }

      setLoading(false);
      setCurrentUser(user);
      setIdToken(iToken);

      if (user) {
        history.push("/");
      }
    });

    return unsubscriber;
    // eslint-disable-next-line
  }, [setCurrentUser, setWhoAmi]);

  const value = {
    currentUser,
    loading,
    whoAmi,
    getIdToken,
    signInEmail,
    regEmail,
    regGoogle,
    signOut,
    idToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
