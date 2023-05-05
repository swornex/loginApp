import { useState } from "react";
import { login } from "./firebaseConnect";

import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

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

    if (user === undefined) return <div>Loading</div>;

    if (user) {
        return <Navigate to="/home" />;
    }

    return (
        <>
            <div className="login-wrapper">
                <img
                    className="image"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/user-account-login-icon.png"
                />

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
                        <a href="#" className="sign-up">
                            Signup
                        </a>
                    </h5>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
