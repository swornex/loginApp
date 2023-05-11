// Import necessary modules and components
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

// Component to require authentication for accessing certain routes
const RequireAuth = ({ children }: { children: JSX.Element }) => {
    // Access the user value from the authentication context
    const { user } = useContext(AuthContext);

    // If the user value is still undefined (loading state),
    // display a message asking the user to wait
    if (user === undefined) {
        return <h2>Please wait while it loads</h2>;
    }

    // If the user is not authenticated, redirect to the login page
    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    // If the user is authenticated, render the child components
    return children;
};

export default RequireAuth;
