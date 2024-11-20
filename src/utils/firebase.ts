// modifikasi src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAam4Njj78FcpmnRULtZGisi857Hj56788",
    authDomain: "todonosql.firebaseapp.com",
    projectId: "todonosql",
    storageBucket: "todonosql.firebasestorage.app",
    messagingSenderId: "745954953072",
    appId: "1:745954953072:web:b1e72044134658a5bff1b5"
  };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };