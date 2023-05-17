// Import necessary modules and components
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { deleteTodoDoc, getTodoDocs } from "../firebase/todoFirebase";
import { AuthContext } from "../authentication/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

    // // Fetch todo documents from Firebase

    const { data, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: () => {
            if (user) return getTodoDocs(user.uid);
        }
    });

    const handleDelete = async (id: string) => {
        await deleteTodoDoc(id);
        setLists(
            lists.filter((list) => {
                return id != list.id;
            })
        );
    };

    if (isLoading) {
        return <h2>Please wait while it loads</h2>;
    }

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
                    {data?.map((list) => {
                        return (
                            <tr key={list.id}>
                                <td>{list.title}</td>
                                <td>{list.desc}</td>
                                <td>{list.dueDate}</td>
                                <td>
                                    <Link
                                        to={`/todos/view/${list.id}`}
                                        className="link"
                                    >
                                        View
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={`/todos/edit/${list.id}`}
                                        className="link"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        type="button"
                                        onClick={() => {
                                            handleDelete(list.id);
                                        }}
                                    >
                                        Delete
                                    </button>
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
