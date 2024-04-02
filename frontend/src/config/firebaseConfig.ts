// firebase.js
import firebase from "firebase/compat/app";
// import * as firebase from "firebase";
import "firebase/compat/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCTX4sQrO_F4m3I3oUmMuBMPE-ST0MweNg",
  authDomain: "mernbooking-app.firebaseapp.com",
  projectId: "mernbooking-app",
  storageBucket: "mernbooking-app.appspot.com",
  messagingSenderId: "263064388809",
  appId: "1:263064388809:web:14cd1614f182f6c7b2f918",
  measurementId: "G-CTHH8QSM0F",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export default firebaseApp;
