import { useState } from "react";
import { auth, login } from "../firebaseConnect";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // await signInWithEmailAndPassword(auth, email, password);
            await login(email, password);
            navigate("/home");
        } catch (error) {
            alert("Incorrect user email or password");
        }
    };

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
