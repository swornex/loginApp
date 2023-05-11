import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleTodoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/todos/addtodo");
    };

    return (
        <>
            <h1>Welcome to home page</h1>
            <button className="button" type="button" onClick={handleTodoButton}>
                Add Todo
            </button>
        </>
    );
};

export default Home;
