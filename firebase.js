import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDevh_Kzi0TPXZ2Rnz8YTl2BcgMLT_Dd9Y",
  authDomain: "laundry-application-9d847.firebaseapp.com",
  projectId: "laundry-application-9d847",
  storageBucket: "laundry-application-9d847.appspot.com",
  messagingSenderId: "1006536736406",
  appId: "1:1006536736406:web:053568311d4ce470044cb7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
