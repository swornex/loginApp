// import { useEffect, useState } from "react";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebaseConnect";
// import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
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

    // return <h1>Main page</h1>;
    // return null;
};
export default Root;
