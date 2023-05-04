import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextProps {
    user: User | null | undefined;
}

export const AuthContext = createContext<AuthContextProps>({ user: undefined });
