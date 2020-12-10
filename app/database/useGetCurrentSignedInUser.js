import React, { useEffect, useState } from "react";
import firebase from "../database/firebase";

function useGetCurrentSignedInUser(props) {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function _onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const suscriber = firebase.auth.onAuthStateChanged(_onAuthStateChanged);
    return suscriber;
  }, []);

  return [user, initializing];
}

export default useGetCurrentSignedInUser;
