// Import necessary modules and components
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTodoDocs } from "../firebase/todoFirebase";

export type Todo = {
    id: string;
    userId: string;
    title: string;
    desc: string;
    dueDate: string;
};
// Home component
const Home = () => {
    const navigate = useNavigate();
    const [lists, setLists] = useState<Todo[]>([]);

    // Handle click event for the "Add Todo" button
    const handleTodoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/todos/addtodo"); // Navigate to the "/todos/addtodo" route
    };

    // Fetch todo documents from Firebase
    const handleFetch = async () => {
        setLists(await getTodoDocs()); // Update the lists state with the fetched data
    };

    useEffect(() => {
        handleFetch(); // Fetch todo documents when the component mounts
    }, []);

    return (
        <>
            <h1>Welcome to home page</h1>
            <button className="button" type="button" onClick={handleTodoButton}>
                Add Todo
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due date</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((list: Todo) => {
                        return (
                            <tr key={list.id}>
                                <td>{list.title}</td>
                                <td>{list.desc}</td>
                                <td>{list.dueDate}</td>
                                <td>
                                    <a href="#">view</a>
                                </td>
                                <td>
                                    <a href="#">edit</a>
                                </td>
                                <td>
                                    <a href="#">delete</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Home;
