// Import necessary modules and components
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

// Component to check the authentication status and redirect accordingly
const CheckAuth = ({ children }: { children: JSX.Element }) => {
    // Access the user value from the authentication context
    const { user } = useContext(AuthContext);

    // If the user value is still undefined (loading state),
    // display a message asking the user to wait
    if (user === undefined) {
        return <h1>Please wait while it loads</h1>;
    }

    // If a user is authenticated, redirect to the home page
    if (user) {
        return <Navigate to="/home" replace />;
    }

    // If the user is not authenticated, render the child components
    return children;
};

export default CheckAuth;
