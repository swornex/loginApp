// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_STORAGE_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

type UserObj = {
    id: string;
    name: string;
    email?: string;
    number: string;
    address: string;
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const signout = async () => {
    await signOut(auth);
};

export const register = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const addUser = async ({
    id,
    name,
    email,
    number,
    address
}: UserObj) => {
    try {
        await setDoc(doc(db, "users", id), {
            id,
            name,
            email,
            number,
            address
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchOne = async (id: string) => {
    try {
        const userDoc = doc(db, "users", id);
        const user = (await getDoc(userDoc)).data();
        if (!user) {
            console.log("No such document");
        } else {
            return user;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUserDoc = async ({ id, name, number, address }: UserObj) => {
    try {
        await updateDoc(doc(db, "users", id), {
            name,
            number,
            address
        });
    } catch (error) {
        console.log(error.message);
    }
};
