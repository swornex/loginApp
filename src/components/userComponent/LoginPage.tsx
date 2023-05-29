import { useState } from "react";
import { login } from "../../firebase/userFirebase";

import { Link } from "react-router-dom";
import userImage from "../../assets/images/userImage.png";
import vectorImg from "../../assets/images/login-signup.png";
import { loginSchema, LoginDetails } from "../../schema/loginSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDetails>({
        resolver: zodResolver(loginSchema)
    });

    const onLogin: SubmitHandler<LoginDetails> = async (data) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
        } catch (error) {
            alert("Incorrect user email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="card">
                <div className="w-80 m-9">
                    <img className="w-28 mb-2 mx-auto" src={userImage} />

                    <div className="m-auto w-60">
                        <form
                            onSubmit={handleSubmit(onLogin)}
                            className="py-2.5"
                        >
                            <div className="text-field">
                                <label htmlFor="email">Email:</label>

                                <input
                                    type="text"
                                    {...register("email")}
                                    id="email"
                                    placeholder="abcd@gmail.com"
                                />
                                {errors.email && (
                                    <span>{errors.email.message}</span>
                                )}
                            </div>
                            <div className="text-field">
                                <label className="label-m" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    id="password"
                                    placeholder="password"
                                />
                                {errors.password && (
                                    <span>{errors.password.message}</span>
                                )}
                            </div>
                            <button disabled={isLoading}>
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                        <hr />
                        <h5>
                            New User?
                            <Link
                                to="/signup"
                                className="px-2 decoration-0 italic font-semibold hover:underline"
                            >
                                Signup
                            </Link>
                        </h5>
                    </div>
                </div>
                <img className="w-96 my-auto" src={vectorImg} />
            </div>
        </>
    );
};

export default LoginPage;
