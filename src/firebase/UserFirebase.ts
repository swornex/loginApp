// Import necessary functions from Firebase modules
import { collection, doc, setDoc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

// Import auth and db instances from the Firebase configuration file
import { auth, db } from "./firebaseConfig";

// Define a TypeScript interface for the user object
type UserObj = {
    name: string;
    email: string;
    number: string;
    address: string;
};

// Function to log in the user using Firebase Auth
export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

// Function to log out the user using Firebase Auth
export const signout = async () => {
    await signOut(auth);
};

// Function to register a new user using Firebase Auth
export const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
};

// Function to add a new user to the Firestore database
export const addUser = async ({ name, email, number, address }: UserObj) => {
    try {
        // Get a reference to the "users" collection in Firestore
        const reference = collection(db, "users");

        // Create a new document in the "users" collection with a unique ID
        const newDocRef = doc(reference);

        // Set the document data to the provided user information
        await setDoc(newDocRef, {
            id: newDocRef.id,
            name,
            email,
            number,
            address
        });
    } catch (error) {
        // Log any errors that occur while adding the user to the database
        console.log(error.message);
    }
};
