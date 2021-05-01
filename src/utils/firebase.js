import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBjSa9xr2kTdTvVq46mAj2yQgykSAD7uKI",
  authDomain: "healthbay-bfce5.firebaseapp.com",
  projectId: "healthbay-bfce5",
  storageBucket: "healthbay-bfce5.appspot.com",
  messagingSenderId: "634717899825",
  appId: "1:634717899825:web:0791f86e8e21d3fb581910",
  measurementId: "G-QR86ZWCC6G",
});

export const auth = app.auth();
export default app;
