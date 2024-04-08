import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkn-s10axQJw1VwuNj2TVwO705XsJsyAw",
  authDomain: "klw-financial.firebaseapp.com",
  projectId: "klw-financial",
  storageBucket: "klw-financial.appspot.com",
  messagingSenderId: "149951852980",
  appId: "1:149951852980:web:4abc9331d317ed6e1382e1",
  measurementId: "G-7SXD9LFBW8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore with the Firebase app instance

export { app, analytics, db }; 