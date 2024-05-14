import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FRIEBASE_APIKEY,
  authDomain: process.env.REACT_APP_FRIEBASE_AUTH_DOM,
  projectId: process.env.REACT_APP_FRIEBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FRIEBASE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FRIEBASE_MESSENGER_ID,
  appId: process.env.REACT_APP_FRIEBASE_APP_ID,
  measurementId: process.env.REACT_APP_FRIEBASE_MESUREMENT_ID
};




const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics, db }; 