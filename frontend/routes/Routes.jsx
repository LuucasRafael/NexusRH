import React from "react";
import Login from "../components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;