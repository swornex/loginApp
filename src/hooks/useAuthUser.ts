import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

const useAuthUser = () => {
    // State to store the authenticated user
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        // Add an authentication state change listener
        // This function will be triggered whenever the authentication state changes
        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser); // Update the user state with the new authenticated user
        });
    }, []);

    return user;
};

export default useAuthUser;
