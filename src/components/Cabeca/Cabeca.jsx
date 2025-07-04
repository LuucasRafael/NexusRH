import React from "react";
import './cabeca.css'
import logo from '../../assets/logo.png'
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Cabeca () {
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const intervalId = setInterval(() => {
           var date = new Date();
          setCurrentDateTime(date.toLocaleString('pt-BR'));
        }, 1000); // Update every second
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [])

    const handleClick = () => {
          alert("Ponto registrado!");
          console.log(currentDateTime)

    };

        const handleLogout = () => {
          console.log('Usuário deslogado');
           navigate("/")
        };

    return(
        <div className="Corpo">
       <a href="/"><img src={logo} alt="logo da empresa" /></a>
       <button id='bp' onClick={handleClick}>bater ponto</button>
       <p>Lucas Rafael</p>
       <button id="Sair" type="submit" onClick={handleLogout} ><FaSignOutAlt/> Sair</button>
      
      
    
        </div>
    )
}

export default Cabeca