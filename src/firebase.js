////////////////////////////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/////////////////////////////////////////////////////////////////////////////
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/////////////////////////////////////////////////////////////////////////////
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRYk7arQmZg4oQ5LrkJtQMy79CgT_e8DE",
  authDomain: "e-comm-9eb63.firebaseapp.com",
  projectId: "e-comm-9eb63",
  storageBucket: "e-comm-9eb63.appspot.com",
  messagingSenderId: "694543870165",
  appId: "1:694543870165:web:d0cb3640e2f3546aab5a5c",
};
/////////////////////////////////////////////////////////////////////////////
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
