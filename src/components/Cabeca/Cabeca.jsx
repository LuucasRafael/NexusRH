import React from "react";
import './cabeca.css'
import logo from '../../assets/logo.png'

function Cabeca () {
    return(
        <div className="Corpo">
       <a href="/"><img src={logo} alt="logo da empresa" /></a>
       <button>bater ponto</button>
        </div>
    )
}

export default Cabeca