// Import necessary functions from Firebase modules
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";

// Import auth and db instances from the Firebase configuration file
import { auth, db } from "./firebaseConfig";

// importing interface/type for the user object using zod
import { userDatabaseType, userUpdateType } from "../schema/userSchema";

// Function to log in the user using Firebase Auth
export const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

// Function to log out the user using Firebase Auth
export const signout = async () => {
    await signOut(auth);
};

// Function to register a new user using Firebase Auth
export const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Function to add a new user to the Firestore database
export const addUser = async ({
    id,
    name,
    email,
    contact,
    address
}: userDatabaseType) => {
    try {
        // Set the document data for the specified user ID in the "users" collection
        await setDoc(doc(db, "users", id), {
            id,
            name,
            email,
            contact,
            address
        });
    } catch (error) {
        // Log any errors that occur while adding the user to the database
        console.log(error.message);
    }
};

// Function to fetch a single user from the Firestore database
export const fetchOne = async (id: string) => {
    try {
        // Get a reference to the user document in the "users" collection
        const userDoc = doc(db, "users", id);

        // Retrieve the data of the user document
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

// Function to update a user document in the Firestore database
export const updateUserDoc = async ({
    id,
    name,
    contact,
    address
}: userUpdateType) => {
    try {
        // Update the specified fields in the user document in the "users" collection
        await updateDoc(doc(db, "users", id), {
            name,
            contact,
            address
        });
    } catch (error) {
        console.log(error.message);
    }
};
