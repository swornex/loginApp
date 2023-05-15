// Import necessary modules and components
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Todo } from "../components/Home";

// Type for todo object
export interface TodoObj {
    title: string;
    desc: string;
    date: string;
}

interface AddTodoObj extends TodoObj {
    userId: string;
}

interface EditTodoObj extends TodoObj {
    id: string;
}

// Function to add a new todo document
export const addTodo = async ({ userId, title, desc, date }: AddTodoObj) => {
    try {
        // Generate a new unique ID for the todo document
        const id = doc(collection(db, "todos")).id;

        // Set the todo document in the "todos" collection with the provided data
        await setDoc(doc(db, "todos", id), {
            id,
            userId,
            title,
            desc,
            dueDate: date
        });
    } catch (error) {
        console.log(error.message);
    }
};

// Function to fetch all todo documents for a specific user
export const getTodoDocs = async (userId: string) => {
    // Retrieve all todo documents from the "todos" collection for the specified user
    const reference = collection(db, "todos");
    const q = query(reference, where("userId", "==", userId));
    const res = await getDocs(q);

    return res.docs.map((doc) => doc.data()) as Todo[]; // Return the fetched documents
};

// Function to fetch a single todo document by ID
export const fetchOneTodo = async (id: string) => {
    try {
        const todoDoc = doc(db, "todos", id);
        const res = (await getDoc(todoDoc)).data();

        return res as Todo | undefined; // Return the fetched todo document
    } catch (error) {
        console.log(error.message);
    }
};

// Function to update a todo document
export const updateTodoDoc = async ({ id, title, desc, date }: EditTodoObj) => {
    try {
        // Update the specified todo document with the provided data
        await updateDoc(doc(db, "todos", id), {
            title,
            desc,
            dueDate: date
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTodoDoc = async (id: string) => {
    try {
        await deleteDoc(doc(db, "todos", id));
    } catch (error) {
        console.log(error.message);
    }
};
