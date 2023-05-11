import { useContext, useState } from "react";
import { AuthContext } from "../../authentication/AuthContext";
import { addTodo } from "../../firebase/todoFirebase";
const AddTodo = () => {
    const [todo, setTodo] = useState({
        title: "",
        desc: "",
        date: ""
    });
    const { user } = useContext(AuthContext);

    const handleTodoInput = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        const value = e.target.value;

        setTodo((prev) => ({ ...prev, [name]: value }));
    };

    const onAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            await addTodo({
                userId: user.uid,
                title: todo.title,
                desc: todo.desc,
                date: todo.date
            });
            alert("Successfully added.");
        }
    };

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
                        min="2023-01-01"
                        max="2025-12-31"
                        name="date"
                        id="date"
                        value={todo.date}
                        onChange={handleTodoInput}
                        required
                    />
                    <button type="submit" className="button">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;
