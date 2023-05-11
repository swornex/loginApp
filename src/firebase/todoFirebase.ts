import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

type TodoObj = {
    userId: string;
    title: string;
    desc: string;
    date: string;
};

export const addTodo = async ({ userId, title, desc, date }: TodoObj) => {
    try {
        const id = doc(collection(db, "todos")).id;

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
