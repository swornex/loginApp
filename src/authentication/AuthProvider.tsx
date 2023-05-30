// Import necessary modules and components
// import { auth } from "../firebase/firebaseConfig";
// import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { PropsWithChildren } from "react";
import useAuthUser from "../hooks/useAuthUser";

// Define the authentication provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const user = useAuthUser();

    return (
        // Provide the authenticated user value to the AuthContext for child components
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
