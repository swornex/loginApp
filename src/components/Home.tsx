// Import necessary modules and components
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTodoDocs } from "../firebase/todoFirebase";
import { AuthContext } from "../authentication/AuthContext";

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
    const { user } = useContext(AuthContext);
    // Handle click event for the "Add Todo" button
    const handleTodoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/todos/addtodo"); // Navigate to the "/todos/addtodo" route
    };

    // Fetch todo documents from Firebase

    useEffect(() => {
        const handleFetch = async () => {
            if (!user) {
                return; // If the user is not defined, exit the function
            }
            // Call the function getTodoDocs with the user's uid and wait for the result
            const allTodoList = await getTodoDocs(user.uid);

            // Update the lists state with the fetched data
            setLists(allTodoList);
        };
        handleFetch(); // Fetch todo documents when the component mounts
    }, [user]);

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
                    {lists.map((list) => {
                        return (
                            <tr key={list.id}>
                                <td>{list.title}</td>
                                <td>{list.desc}</td>
                                <td>{list.dueDate}</td>
                                <td>
                                    <Link to={`/todos/view/${list.id}`}>
                                        View
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/todos/edit/${list.id}`}>
                                        Edit
                                    </Link>
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
