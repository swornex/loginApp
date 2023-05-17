import { useParams } from "react-router-dom";
import { fetchOneTodo } from "../../firebase/todoFirebase";
import { useQuery } from "@tanstack/react-query";

const ViewTodo = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["todos", id],
        queryFn: () => {
            if (id) return fetchOneTodo(id);
        }
    });

    if (isLoading) {
        return <h1>Please wait while it loads</h1>;
    }

    if (data === undefined) {
        return <h1>Todo not found</h1>;
    }

    return (
        <div className="box-wrapper">
            <ul>
                <li>
                    <h2>Title= {data.title}</h2>
                </li>
                <li>Description = {data.desc}</li>
                <li>Todo-Id = {data.id}</li>
                <li>User-Id = {data.userId}</li>
                <li>Due Date = {data.dueDate}</li>
            </ul>
        </div>
    );
};

export default ViewTodo;
