// Import necessary modules and components
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { deleteTodoDoc, getTodoDocs } from "../firebase/todoFirebase";
import { AuthContext } from "../authentication/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Todo = {
    id: string;
    userId: string;
    title: string;
    description: string;
    dueDate: string;
};
// Home component
const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    // Handle click event for the "Add Todo" button
    const handleTodoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/todos/addtodo"); // Navigate to the "/todos/addtodo" route
    };

    // // Fetch todo documents from Firebase
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: () => {
            if (user) return getTodoDocs(user.uid);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTodoDoc,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
        }
    });

    if (isLoading) {
        return <h2>Please wait while it loads</h2>;
    }

    return (
        <>
            <h1>Welcome to home page</h1>
            <button
                className="py-1 px-5 rounded block text-neutral-200 hover:bg-nightRider-500 button-m"
                type="button"
                onClick={handleTodoButton}
            >
                Add Todo
            </button>
            <table className="w-11/12 mx-auto">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th className="w-3/5">Description</th>
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
                                <td>{list.description}</td>
                                <td>{list.dueDate}</td>
                                <td>
                                    <Link
                                        to={`/todos/view/${list.id}`}
                                        className="decoration-0 text-neutral-200 text-base"
                                    >
                                        View
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={`/todos/edit/${list.id}`}
                                        className="decoration-0 text-neutral-200 text-base"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteMutation.mutate(list.id);
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
