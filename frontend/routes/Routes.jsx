import React from "react";
import Login from "../components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import ListaUsers from "../components/Funcionarios/Funcionarios";
import CadastroFuncionario from "../components/Cadastro/Cadastro";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
                <Route path="/Funcionarios" element={<ListaUsers/>}></Route>
                 <Route path="/Cadastro" element={<CadastroFuncionario/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;