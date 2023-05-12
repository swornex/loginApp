import { useLocation, useNavigate } from "react-router-dom";

const ViewTodo = () => {
    const { state: list } = useLocation(); // Retrieve the state passed via the react-router location
    const navigate = useNavigate(); // Access the navigation function provided by react-router

    const handleDoneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/home"); // Navigate to the "/home" route when the "Done" button is clicked
    };

    return (
        <>
            <div className="box-wrapper">
                <ul>
                    <li>
                        <h2>Title= {list.title}</h2>{" "}
                        {/* Display the title of the todo */}
                    </li>
                    <li>Description = {list.desc}</li>{" "}
                    {/* Display the description of the todo */}
                    <li>Todo-Id = {list.id}</li>{" "}
                    {/* Display the ID of the todo */}
                    <li>User-Id = {list.userId}</li>{" "}
                    {/* Display the user ID associated with the todo */}
                    <li>Due Date = {list.dueDate}</li>{" "}
                    {/* Display the due date of the todo */}
                </ul>
                <button className="button" onClick={handleDoneButton}>
                    Done
                </button>{" "}
                {/* Button to mark the todo as done */}
            </div>
        </>
    );
};

export default ViewTodo;
