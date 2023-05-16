import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authentication/AuthContext";
import {
    TodoObj,
    addTodo,
    fetchOneTodo,
    updateTodoDoc
} from "../../firebase/todoFirebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddTodo = () => {
    const location = useLocation();
    const isAddTodo = location.pathname === "/todos/addtodo";
    const { id } = useParams();

    // State to manage the input values
    const [todo, setTodo] = useState<TodoObj | undefined | null>(
        isAddTodo
            ? {
                  title: "",
                  desc: "",
                  date: ""
              }
            : null
    );

    //changing format of date
    const date = () => {
        const current_date = new Date();

        const year = current_date.getFullYear();
        let month = (current_date.getMonth() + 1).toString();
        let day = current_date.getDate().toString();

        if (current_date.getDate() < 10) day = "0" + day;
        if (current_date.getMonth() + 1 < 10) month = "0" + month;

        return year + "-" + month + "-" + day;
    };

    // React Router hook for navigation
    const navigate = useNavigate();

    // Accessing the user object from the AuthContext
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch the todo data if the ID is provided
        if (id) {
            fetchOneTodo(id).then((todoData) => {
                if (todoData != undefined) {
                    setTodo({
                        title: todoData.title,
                        desc: todoData.desc,
                        date: todoData.dueDate
                    });
                } else {
                    setTodo(todoData);
                }
            });
        }
    }, [id]);

    // Handler for input changes
    const handleTodoInput = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        const value = e.target.value;

        setTodo((prev) => {
            if (prev) {
                return { ...prev, [name]: value };
            }
        });
    };

    // Function to handle the form submission
    const onAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            if (todo) {
                if (isAddTodo) {
                    // Call the addTodo function with the necessary data
                    await addTodo({
                        userId: user.uid,
                        title: todo.title,
                        desc: todo.desc,
                        date: todo.date
                    });

                    // Show success message and navigate to the home page
                    alert("Successfully added.");
                } else {
                    if (id) {
                        // Call the updateTodoDoc function with the necessary data
                        await updateTodoDoc({
                            id,
                            title: todo.title,
                            desc: todo.desc,
                            date: todo.date
                        });
                    }
                    alert("Successfully updated");
                }
                navigate("/home");
            }
        }
    };

    if (todo === undefined) {
        return <h2>No todo list found</h2>;
    }
    if (todo === null) {
        return <h2>Please wait while it loads</h2>;
    }

    return (
        <div className="main-form-wrapper">
            <div className="form-wrapper">
                <form className="form" onSubmit={onAdd}>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        placeholder="todo title"
                        name="title"
                        id="title"
                        value={todo.title}
                        onChange={handleTodoInput}
                        required
                    />

                    <label htmlFor="desc">Description:</label>
                    <textarea
                        placeholder="deep description on titled todo"
                        name="desc"
                        id="desc"
                        value={todo.desc}
                        onChange={handleTodoInput}
                        required
                    ></textarea>

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="calender"
                        min={date()}
                        name="date"
                        id="date"
                        value={todo.date}
                        onChange={handleTodoInput}
                        required
                    />

                    <button type="submit" className="button">
                        {isAddTodo ? "Add" : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;
