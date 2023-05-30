import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    addUser,
    fetchOne,
    signUp,
    updateUserDoc
} from "../../firebase/userFirebase";

import { AuthContext } from "../../authentication/AuthContext";
import { userSchema, UserAddType } from "../../schema/userSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import vectorImg from "../../assets/images/login-signup.png";
import userImage from "../../assets/images/userImage.png";

const UserDetails = () => {
    const location = useLocation();
    const isSignUp = location.pathname === "/signup";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<UserAddType>({
        resolver: zodResolver(userSchema)
    });

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchOne(user.uid)
                .then((userData) => {
                    if (userData != undefined) {
                        const fields = [
                            "name",
                            "email",
                            "contact",
                            "address"
                        ] as const;
                        fields.forEach((field) =>
                            setValue(field, userData[field])
                        );
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [user, location.pathname, setValue]);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const onRegister: SubmitHandler<UserAddType> = async (data) => {
        if (data != null) {
            try {
                setIsLoading(true);

                if (isSignUp) {
                    if (!data.password) {
                        alert("Please provide password");
                        return;
                    }

                    //register new user from the given email and password
                    const newUser = await signUp(data.email, data.password);

                    //call addUser function with the necessary data
                    await addUser({
                        id: newUser.user.uid,
                        name: data.name,
                        email: data.email,
                        contact: data.contact,
                        address: data.address
                    });
                    alert("Successfully Signed up.");
                } else {
                    if (user) {
                        //call addUser function with the necessary data
                        await updateUserDoc({
                            id: user?.uid,
                            name: data.name,
                            contact: data.contact,
                            address: data.address
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

    return (
        <>
            <div className="card">
                <div className="w-80 m-9">
                    <img className="w-28 mb-2 mx-auto" src={userImage} />

                    <div className="m-auto w-60">
                        <form
                            onSubmit={handleSubmit(onRegister)}
                            className="py-2.5"
                        >
                            <div className="text-field">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    id="name"
                                    placeholder="ram"
                                />
                                {errors.name && (
                                    <span>{errors.name.message}</span>
                                )}
                            </div>
                            <div className="text-field">
                                <label className="label-m" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    id="email"
                                    placeholder="abcd@gmail.com"
                                    disabled={location.pathname === "/profile"}
                                />
                                {errors.email && (
                                    <span>{errors.email.message}</span>
                                )}
                            </div>
                            {isSignUp && (
                                <div className="text-field">
                                    <label
                                        className="label-m"
                                        htmlFor="password"
                                    >
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
                            )}
                            <div className="text-field">
                                <label className="label-m" htmlFor="number">
                                    Contact:
                                </label>
                                <input
                                    type="text"
                                    {...register("contact")}
                                    id="number"
                                    placeholder="9841000000"
                                />
                                {errors.contact && (
                                    <span>{errors.contact.message}</span>
                                )}
                            </div>
                            <div className="text-field">
                                <label className="label-m" htmlFor="address">
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    {...register("address")}
                                    id="address"
                                    placeholder="Kathmandu"
                                />
                                {errors.address && (
                                    <span>{errors.address.message}</span>
                                )}
                            </div>
                            <button disabled={isLoading}>
                                {isLoading
                                    ? "Loading..."
                                    : isSignUp
                                    ? "Sign Up"
                                    : "Update"}
                            </button>
                        </form>
                        {isSignUp && (
                            <>
                                <hr />
                                <h5>
                                    Old User?
                                    <Link
                                        to="/login"
                                        className="px-2 decoration-0 italic font-semibold hover:underline"
                                    >
                                        Login
                                    </Link>
                                </h5>
                            </>
                        )}
                    </div>
                </div>
                {isSignUp && <img className="w-96 my-auto" src={vectorImg} />}
            </div>
        </>
    );
};

export default UserDetails;
