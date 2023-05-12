import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneTodo } from "../../firebase/todoFirebase";
import { Todo } from "../Home";

const ViewTodo = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo>();
    const navigate = useNavigate(); // Access the navigation function provided by react-router

    useEffect(() => {
        if (id) {
            fetchOneTodo(id)
                .then((todoData) => {
                    if (todoData != undefined) {
                        setTodo(todoData);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [id]);
    console.log(todo);

    const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/home"); // Navigate to the "/home" route when the "Done" button is clicked
    };

    if (todo === undefined) {
        return null;
    }
    return (
        <>
            <div className="box-wrapper">
                <ul>
                    <li>
                        <h2>Title= {todo.title}</h2>
                    </li>
                    <li>Description = {todo.desc}</li>
                    <li>Todo-Id = {todo.id}</li>
                    <li>User-Id = {todo.userId}</li>
                    <li>Due Date = {todo.dueDate}</li>
                </ul>
            </div>
        </>
    );
};

export default ViewTodo;
