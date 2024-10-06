import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
export const backendUrl = "https://techugoapps.com:7843/api";

const firebaseConfig = {
  apiKey: "AIzaSyBh8MeJrQ7s4SCEYmw0UG5AuZCp6l8m2nk",
  authDomain: "netme-chat-app.firebaseapp.com",
  projectId: "netme-chat-app",
  storageBucket: "netme-chat-app.appspot.com",
  messagingSenderId: "781444618301",
  appId: "1:781444618301:web:4cb8a9be7217f4c80d3254",
  measurementId: "G-FT0BLKCJC9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
fbProvider.setCustomParameters({
  display: "popup",
  auth_type: "reauthenticate",
});

export { auth, provider, fbProvider, db, doc, getDoc };
