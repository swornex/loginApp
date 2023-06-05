import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/userComponent/LoginPage";

import Root from "./components/Root";
import { AuthProvider } from "./authentication/AuthProvider";
import RequireAuth from "./authentication/RequireAuth";
import CheckAuth from "./authentication/CheckAuth";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Contact from "./components/Contact";
import UserForm from "./components/userComponent/UserForm";
import AddTodo from "./components/todoComponent/AddTodo";
import ViewTodo from "./components/todoComponent/ViewTodo";
import { useState } from "react";

function App() {
    const [currentPage, setCurrentPage] = useState(1);

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
                                    <>
                                        <Navigation />
                                        <Home
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/about"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <About />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <Contact />
                                    </>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                <CheckAuth>
                                    <LoginPage />
                                </CheckAuth>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <CheckAuth>
                                    <UserForm />
                                </CheckAuth>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <UserForm />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route path="/todos">
                            <Route
                                path="addtodo"
                                element={
                                    <RequireAuth>
                                        <>
                                            <Navigation />
                                            <AddTodo
                                                currentPage={currentPage}
                                            />
                                        </>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="view/:id"
                                element={
                                    <RequireAuth>
                                        <>
                                            <Navigation />
                                            <ViewTodo />
                                        </>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="edit/:id"
                                element={
                                    <RequireAuth>
                                        <>
                                            <Navigation />
                                            <AddTodo
                                                currentPage={currentPage}
                                            />
                                        </>
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route path="/*" element={<Root />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
