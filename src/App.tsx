import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

import Root from "./components/Root";
import { AuthProvider } from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route
                            path="/home"
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />

                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
