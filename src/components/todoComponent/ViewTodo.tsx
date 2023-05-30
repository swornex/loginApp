import { useParams } from "react-router-dom";
import { fetchOneTodo } from "../../firebase/todoFirebase";
import { useQuery } from "@tanstack/react-query";

const ViewTodo = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["todos", id],
        queryFn: () => fetchOneTodo(id)
    });

    if (isLoading) {
        return <h1>Please wait while it loads</h1>;
    }

    if (data === undefined) {
        return <h1>Todo not found</h1>;
    }

    return (
        <div className="w-2/4 bg-nightRider-500 mx-auto my-32 text-justify">
            <ul className="list-none">
                <li className="p-1 pb-3 text-3xl">Title= {data.title}</li>
                <li className="p-1">Description = {data.description}</li>
                <li className="p-1">Todo-Id = {data.id}</li>
                <li className="p-1">User-Id = {data.userId}</li>
                <li className="p-1">Due Date = {data.dueDate}</li>
            </ul>
        </div>
    );
};

export default ViewTodo;
