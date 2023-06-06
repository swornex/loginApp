import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const migrate = async () => {
    const res = await getDocs(collection(db, "todos"));
    const todos = res.docs.map((todo) => todo.data());
    const data = todos.map((todo) => {
        const date = Date.now().valueOf();
        return {
            ...todo,
            createdAt: date,
            updatedAt: date
        };
    });
    console.log(data);

    data.forEach(async (todo: any) => {
        await updateDoc(doc(db, "todos", todo.id), todo);
    });

    console.log("done");
};
