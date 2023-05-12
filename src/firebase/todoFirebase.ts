// Import necessary modules and components
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Todo } from "../components/Home";

// Type for todo object
type TodoObj = {
    userId: string;
    title: string;
    desc: string;
    date: string;
};

// Function to add a new todo document
export const addTodo = async ({ userId, title, desc, date }: TodoObj) => {
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

// Function to fetch all todo documents
export const getTodoDocs = async () => {
    // Retrieve all todo documents from the "todos" collection
    const res = await getDocs(collection(db, "todos"));
    return res.docs.map((doc) => doc.data()) as Todo[]; // Return the fetched documents
};

export const fetchOneTodo = async (id: string) => {
    try {
        const todoDoc = doc(db, "todos", id);
        const res = (await getDoc(todoDoc)).data();
        return res as Todo;
    } catch (error) {
        console.log(error.message);
    }
};
