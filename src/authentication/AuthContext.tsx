// Import necessary types from Firebase modules
import { User } from "firebase/auth";

// Import createContext function from React
import { createContext } from "react";

// Define the interface for the authentication context properties
interface AuthContextProps {
    user: User | null | undefined; // User object representing the authenticated user or null/undefined
}

// Create an instance of the authentication context with initial value
export const AuthContext = createContext<AuthContextProps>({ user: undefined });
