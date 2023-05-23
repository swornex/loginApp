import { useState } from "react";
import { login } from "../../firebase/userFirebase";

import { Link } from "react-router-dom";
import userImage from "../../assets/images/userImage.png";
import { loginSchema, LoginDetails } from "../../schema/loginSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm<LoginDetails>({
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
            <div className="main-form-wrapper">
                <img className="image" src={userImage} />

                <div className="form-wrapper">
                    <form onSubmit={handleSubmit(onLogin)} className="form">
                        <label htmlFor="email">Email:</label>

                        <input
                            type="text"
                            {...register("email")}
                            id="email"
                            placeholder="abcd@gmail.com"
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            {...register("password")}
                            id="password"
                            placeholder="password"
                        />
                        <br />
                        <button className="button" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <h5>New account?</h5>
                    <hr />
                    <h5>
                        <Link to="/signup" className="sign-up">
                            Signup
                        </Link>
                    </h5>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
