import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUhDdldQkPVmuFmHJSTa_Ds_QYPzbOWKg",
  authDomain: "mymoney-130ac.firebaseapp.com",
  projectId: "mymoney-130ac",
  storageBucket: "mymoney-130ac.appspot.com",
  messagingSenderId: "46135941566",
  appId: "1:46135941566:web:7ddaf0514e74b6367481ef",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const projectFirestore = getFirestore(app);

export { projectFirestore };
