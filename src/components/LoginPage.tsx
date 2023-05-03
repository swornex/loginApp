import { useState } from "react";
import { login } from "../firebaseConnect";

import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../AuthContext";
// import { Navigate } from "react-router-dom";

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

    // const { user } = useContext(AuthContext);

    // if (user === null) {
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
    // } else if (user?.uid) {
    //     return (
    //         <h1>
    //             <Navigate replace to="/home" />
    //         </h1>
    //     );
    // } else {
    //     return <h2>Please wait while it loads</h2>;
    // }
};

export default LoginPage;
