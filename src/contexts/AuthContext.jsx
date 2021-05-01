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
  const history = useHistory();

  async function regEmail(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function signInEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function regGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    setCurrentUser(result.user);

    const idToken = await result.user.getIdToken();
    console.log(idToken);
  }

  async function signOut() {
    await auth.signOut();
    history.push("/");
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      /* TODO: WhoAmi from Server */

      setLoading(false);
      setCurrentUser(user);
      setWhoAmi(null);

      if (user) {
        history.push("/");
      }
    });

    return unsubscriber;
    // eslint-disable-next-line
  }, [setCurrentUser]);

  const value = {
    currentUser,
    loading,
    whoAmi,
    signInEmail,
    regEmail,
    regGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
