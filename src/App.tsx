import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";

import Root from "./components/Root";
import { AuthProvider } from "./components/AuthProvider";

function App() {
    // const router = createBrowserRouter([
    //     {
    //         path: "/root",
    //         element: <Root />,
    //         children: [
    //             {
    //                 path: "home",
    //                 element: <Home />
    //             },
    //             {
    //                 path: "login",
    //                 element: <LoginPage />
    //             }
    //         ]
    //     }
    // ]);

    // return <>{/* <RouterProvider router={router} /> */}</>;

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route path="home" element={<Home />} />
                            <Route path="login" element={<LoginPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
