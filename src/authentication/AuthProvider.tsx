// Import necessary modules and components
import { auth } from "../firebase/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { PropsWithChildren, useEffect, useState } from "react";

// Define the authentication provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
    // State to store the authenticated user
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        // Add an authentication state change listener
        // This function will be triggered whenever the authentication state changes
        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser); // Update the user state with the new authenticated user
        });
    }, []);

    return (
        // Provide the authenticated user value to the AuthContext for child components
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
