import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    addUser,
    fetchOne,
    register,
    updateUserDoc
} from "../firebase/userFirebase";
import userImage from "../assets/images/userImage.png";
import { AuthContext } from "./AuthContext";

type UserDetailsType = {
    name: string;
    email: string;
    password?: string;
    number: string;
    address: string;
};

const UserDetails = () => {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";

    const [userDetails, setUserDetails] = useState<UserDetailsType | null>(
        isSignUp
            ? {
                  name: "",
                  email: "",
                  password: "",
                  number: "",
                  address: ""
              }
            : null
    );

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchOne(user.uid)
                .then((userData) => {
                    if (userData != undefined) {
                        setUserDetails({
                            name: userData.name,
                            email: userData.email,
                            number: userData.number,
                            address: userData.address
                        });
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [user, location.pathname]);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        // if (userDetails && typeof name === "string") {
        // setUserDetails({ ...userDetails, [name]: value });
        // }
        if (userDetails != null) {
            setUserDetails((prev) => {
                if (prev) {
                    return { ...prev, [name]: value };
                }
                return null;
            });
        }
    };

    const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userDetails != null) {
            try {
                setIsLoading(true);

                if (isSignUp) {
                    if (!userDetails.password) {
                        alert("Please provide password");
                        return;
                    }

                    const newUser = await register(
                        userDetails.email,
                        userDetails.password
                    );

                    await addUser({
                        id: newUser.user.uid,
                        name: userDetails.name,
                        email: userDetails.email,
                        number: userDetails.number,
                        address: userDetails.address
                    });
                    alert("Successfully Signed up.");
                } else {
                    if (user) {
                        await updateUserDoc({
                            id: user?.uid,
                            name: userDetails.name,
                            number: userDetails.number,
                            address: userDetails.address
                        });
                        alert("Successfully updated.");
                        navigate("/home");
                    }
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (userDetails) {
        return (
            <>
                <div className="main-form-wrapper">
                    {isSignUp ? (
                        <img className="image" src={userImage} />
                    ) : (
                        <img className="image" src={userImage} />
                    )}

                    <div className="form-wrapper">
                        <form onSubmit={onRegister} className="form">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="ram"
                                value={userDetails.name}
                                onChange={handleUserInput}
                                required
                            />
                            <label htmlFor="email">Email:</label>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="abcd@gmail.com"
                                value={userDetails.email}
                                onChange={handleUserInput}
                                required
                                disabled={location.pathname === "/profile"}
                            />
                            {isSignUp && (
                                <>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        value={userDetails.password}
                                        onChange={handleUserInput}
                                        required
                                    />
                                </>
                            )}

                            <label htmlFor="number">Number:</label>
                            <input
                                type="text"
                                name="number"
                                id="number"
                                placeholder="9841000000"
                                value={userDetails.number}
                                onChange={handleUserInput}
                                required
                            />
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Kathmandu"
                                value={userDetails.address}
                                onChange={handleUserInput}
                                required
                            />
                            <button className="button" disabled={isLoading}>
                                {isLoading
                                    ? "Loading..."
                                    : isSignUp
                                    ? "Sign Up"
                                    : "Update"}
                            </button>
                        </form>
                        {isSignUp && (
                            <>
                                <h5>Already have an account?</h5>
                                <hr />
                                <h5>
                                    <Link to="/login" className="login">
                                        Login
                                    </Link>
                                </h5>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
    return null;
};

export default UserDetails;
