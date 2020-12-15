import React, { useEffect, useState } from "react";
import BnbSecureStore from "../classes/BnbSecureStore";
import constants from "../constant/constants";
import urls from "../constant/urls";
import firebase from "../database/firebase";
import httpGetTokenRequest from "../helpers/httpGetTokenRequest";

function useGetCurrentSignedInUser(props) {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function _onAuthStateChanged(user) {
    setUser(user);

    /**TODO: ver de meter aca el BnbSecureStore del SignIn y del Login */
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
