import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

import Root from "./components/Root";
import { AuthProvider } from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Contact from "./components/Contact";

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
                                    <>
                                        <Navigation />
                                        <Home />
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

                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/*" element={<Root />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
