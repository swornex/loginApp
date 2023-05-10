import { useState } from "react";
import { login } from "../firebase/userFirebase";

import { Link } from "react-router-dom";
import userImage from "../assets/images/userImage.png";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await login(email, password);
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
                    <form onSubmit={onLogin} className="form">
                        <label htmlFor="email">Email:</label>

                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="abcd@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
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
