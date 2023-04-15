import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Game from "./Pages/Game/Game";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
    const token = localStorage.getItem("token");
    const isAuthenticated = token ? true : false;

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route
                        index
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="game"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Game />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
