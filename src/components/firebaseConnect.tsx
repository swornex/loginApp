// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "loginapp-592bf.firebaseapp.com",
    projectId: "loginapp-592bf",
    storageBucket: "loginapp-592bf.appspot.com",
    messagingSenderId: "94748544133",
    appId: "1:94748544133:web:d20293a62e502479d76dec",
    measurementId: "G-EMNDPM35HP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};
