import React from "react";
import './cabeca.css'
import logo from '../../assets/logo.png'

function Cabeca () {

    const handleClick = () => {
          alert("Ponto registrado!");
    };

    return(
        <div className="Corpo">
       <a href="/"><img src={logo} alt="logo da empresa" /></a>
       <button onClick={handleClick}>bater ponto</button>
        </div>
    )
}

export default Cabeca