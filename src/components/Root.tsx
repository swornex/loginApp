import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { Navigate } from "react-router-dom";

const Root = () => {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <Navigate to="login" />;
    } else if (user?.uid) {
        return <Navigate to="home" />;
    } else {
        return <h2>Please wait while it loads</h2>;
    }
};
export default Root;
