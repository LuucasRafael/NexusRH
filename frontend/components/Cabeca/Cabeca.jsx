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

  const handleClick =  async () => {
     if (!usuario?.id) {
    alert("Usuário não identificado");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/ponto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcionario_id: usuario.id,
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao registrar ponto");

    alert("✅ Ponto registrado com sucesso!");
    console.log("Ponto registrado:", data);
  } catch (err) {
    console.error("Erro ao registrar ponto:", err);
    alert("Erro ao registrar ponto.");
  }
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
