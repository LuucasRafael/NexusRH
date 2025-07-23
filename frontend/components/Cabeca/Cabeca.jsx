import React, { useState, useEffect } from "react";
import './cabeca.css';
import logo from '../../assets/logo.png';
import { FaSignOutAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Cabeca({ menuAberto }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setCurrentDateTime(date.toLocaleString('pt-BR'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    alert("Ponto registrado!");
    console.log(currentDateTime);
  };

  const handleLogout = () => {
    console.log('Usuário deslogado');
    navigate("/");
  };

  return (
    <header
      className="cabeca"
      style={{
        marginLeft: menuAberto ? 200 : 60,
        width: `calc(100% - ${menuAberto ? 200 : 60}px)`,
        transition: 'margin-left 0.3s ease, width 0.3s ease',
      }}
    >
      <a href="/Home">
        <img src={logo} alt="Logo da empresa" />
      </a>
      <div className="cabeca-direita">
        <button id="bp" onClick={handleClick}>
          <FaClock size={18} color="green" />
        </button>
        <p>{usuario?.nome}</p>
        <button id="Sair" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </div>
    </header>
  );
}

export default Cabeca;
