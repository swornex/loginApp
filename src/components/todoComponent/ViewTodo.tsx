import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneTodo } from "../../firebase/todoFirebase";
import { Todo } from "../Home";

const ViewTodo = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo | undefined | null>(null);

    useEffect(() => {
        if (id) {
            fetchOneTodo(id).then((todoData) => {
                setTodo(todoData);
            });
        }
    }, [id]);

    if (todo === null) {
        return <h1>Please wait while it loads</h1>;
    }

    if (todo === undefined) {
        return <h1>Todo not found</h1>;
    }

    return (
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
    );
};

export default ViewTodo;
