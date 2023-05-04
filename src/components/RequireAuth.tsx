import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return <h2>Please wait while it loads</h2>;
    }

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequireAuth;
