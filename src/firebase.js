import { initializeApp } from "firebase/app";
import { getFirestore }    from "firebase/firestore";
import { getAuth }         from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM-D5d3AM7JaCsiujjER3DT2HzgkE4DHI",
  authDomain: "cfo-webapp-f8170.firebaseapp.com",
  projectId: "cfo-webapp-f8170",
  storageBucket: "cfo-webapp-f8170.firebasestorage.app",
  messagingSenderId: "184675507981",
  appId: "1:184675507981:web:19cdfeefa845f2ea8d9a44",
  measurementId: "G-37X8TRTJ87"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
