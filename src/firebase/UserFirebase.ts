// Import the functions you need from the SDKs you need
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";

type UserObj = {
    id: string;
    name: string;
    email?: string;
    number: string;
    address: string;
};

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
