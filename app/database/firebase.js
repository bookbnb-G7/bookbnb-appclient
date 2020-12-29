import firebase from "firebase";

import "firebase/auth";

// TODO: Esto mepa iria mejor en variables de entorno porque es info privada
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBCOf10elgsS0KcCiGTvfGvP5yODsXL8oU",
  authDomain: "bookbnb-889bf.firebaseapp.com",
  databaseURL: "https://bookbnb-889bf.firebaseio.com",
  projectId: "bookbnb-889bf",
  storageBucket: "bookbnb-889bf.appspot.com",
  messagingSenderId: "450909270234",
  appId: "1:450909270234:web:2facee8f464215a35875e3",
};

/**Si no fue inicializado */
if (firebase.apps.length === 0) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export default {
  firebase,
  auth,
};
