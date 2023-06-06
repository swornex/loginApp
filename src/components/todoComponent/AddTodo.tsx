import { useContext, useEffect } from "react";
import { AuthContext } from "../../authentication/AuthContext";
import {
    addTodo,
    fetchOneTodo,
    updateTodoDoc
} from "../../firebase/todoFirebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commonTodoSchema, CommonTodoType } from "../../schema/todoSchema";

type CurrentPage = {
    currentPage: number;
};

const AddTodo = ({ currentPage }: CurrentPage) => {
    const location = useLocation();
    const isAddTodo = location.pathname === "/todos/addtodo";
    const { id } = useParams();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<CommonTodoType>({
        resolver: zodResolver(commonTodoSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: ""
        }
    });

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

    //fetching data using specified id through fetchOneTodo function
    const { data } = useQuery({
        queryKey: ["todos", id],
        queryFn: () => {
            if (id) return fetchOneTodo(id);
        }
    });

    //updating the todo based on fetched data
    useEffect(() => {
        if (id) {
            if (data === undefined) {
                setValue(data, data);
            } else {
                const fields = ["title", "description", "dueDate"] as const;
                fields.forEach((field) => {
                    setValue(field, data[field]);
                });
            }
        }
    }, [data, id, setValue]);

    const addMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos", currentPage]);
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateTodoDoc,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos", id]);
        }
    });

    const onAdd: SubmitHandler<CommonTodoType> = async (data) => {
        if (user) {
            if (data) {
                if (isAddTodo) {
                    addMutation.mutate({
                        userId: user.uid,
                        title: data.title,
                        description: data.description,
                        dueDate: data.dueDate
                    });

                    // Show success message and navigate to the home page
                    alert("Successfully added.");
                } else {
                    if (id) {
                        //  Call the updateTodoDoc function with the necessary data

                        updateMutation.mutate({
                            id,
                            title: data.title,
                            description: data.description,
                            dueDate: data.dueDate
                        });
                    }
                    alert("Successfully updated");
                }
                navigate("/home");
            }
        }
    };

    if (id && data === undefined) {
        return <h2>No todo list found</h2>;
    }

    if (data === null) {
        return <h2>Please wait while it loads</h2>;
    }

    return (
        <div className="card">
            <div className="m-9 w-64">
                <form className="m-auto w-60" onSubmit={handleSubmit(onAdd)}>
                    <div className="text-field">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            placeholder="todo title"
                            {...register("title")}
                            id="title"
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </div>
                    <div className="text-field">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            placeholder="deep description on titled todo"
                            {...register("description")}
                            id="description"
                        ></textarea>
                        {errors.description && (
                            <span>{errors.description.message}</span>
                        )}
                    </div>
                    <div className="text-field pt-7">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            className="calender"
                            min={date()}
                            {...register("dueDate", { required: true })}
                            id="date"
                        />
                        {errors.dueDate && (
                            <span>{errors.dueDate.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className=" my-10 mx-auto py-1 px-5 rounded block bg-blackPearl-600 text-neutral-200 hover:bg-blackPearl-700"
                    >
                        {addMutation.isLoading || updateMutation.isLoading
                            ? "Loading"
                            : isAddTodo
                            ? "Add"
                            : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;
