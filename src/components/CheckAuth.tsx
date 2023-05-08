import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const CheckAuth = ({ children }: { children: JSX.Element }) => {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return <h1>Please wait while it loads</h1>;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default CheckAuth;
