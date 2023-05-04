import { auth } from "./firebaseConnect";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { PropsWithChildren, useEffect, useState } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
