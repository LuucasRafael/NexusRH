import React from "react";
import Login from "../components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import ListaUsers from "../components/Funcionarios/Funcionarios";
import CadastroFuncionario from "../components/Cadastro/Cadastro";
import Editar from "../components/Editar/Editar";
import Ferias from "../components/Ferias/Ferias";
import NovaFerias from "../components/NovaFerias/NovaFerias";
import Pontos from "../components/Pontos/Pontos"
import CadastroDesconto from "../components/Desconto/Desconto";
import FolhaPagamento from "../components/FolhaPagamento/FolhaPagamento"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
                <Route path="/Funcionarios" element={<ListaUsers/>}></Route>
                <Route path="/Cadastro" element={<CadastroFuncionario/>}></Route>
                <Route path="/editar/:id" element={<Editar/>}></Route>
                <Route path="/Ferias" element={<Ferias/>}></Route>
                <Route path="/ferias/nova" element={<NovaFerias/>}></Route>
                <Route path="/pontos" element={<Pontos />}></Route>
                <Route path="/descontos" element={<CadastroDesconto/>}></Route>
                <Route path="/FolhaPagamento" element={<FolhaPagamento />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;