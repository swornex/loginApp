import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser, register } from "./firebaseConnect";

const SignupPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        address: ""
    });
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await register(user.email, user.password);
            await addUser({
                name: user.name,
                email: user.email,
                number: user.number,
                address: user.address
            });
            alert("You are signed up.");
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="main-form-wrapper">
                <img
                    className="image"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/user-account-login-icon.png"
                />

                <div className="form-wrapper">
                    <form onSubmit={onRegister} className="form">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="ram"
                            value={user.name}
                            onChange={handleUserInput}
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="abcd@gmail.com"
                            value={user.email}
                            onChange={handleUserInput}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            value={user.password}
                            onChange={handleUserInput}
                            required
                        />
                        <label htmlFor="number">Number:</label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            placeholder="9841000000"
                            value={user.number}
                            onChange={handleUserInput}
                            required
                        />
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Kathmandu"
                            value={user.address}
                            onChange={handleUserInput}
                            required
                        />
                        <button className="button" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>
                    <h5>Already have an account?</h5>
                    <hr />
                    <h5>
                        <Link to="/login" className="login">
                            Login
                        </Link>
                    </h5>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
