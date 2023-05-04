import { useState } from "react";
import { login } from "./firebaseConnect";

import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/home");
        } catch (error) {
            alert("Incorrect user email or password");
        }
    };

    if (user === undefined) return <div>Loading</div>;

    if (user) {
        return <Navigate to="/home" />;
    }

    return (
        <>
            <form onSubmit={onLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="abcd@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete=""
                />
                <button>Login</button>
            </form>
        </>
    );
};

export default LoginPage;
