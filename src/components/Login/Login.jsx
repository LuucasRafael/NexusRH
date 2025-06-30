import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login () {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", Email,Senha);
    //alert("Formulário enviado com sucesso!");
    // Aqui você pode enviar os dados para um servidor, por exemplo.
    navigate("/Home")
  };

  return (
    <div className="Tela">
    <div className="Login">
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="input-field">
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          onChange={(e)=> setEmail(e.target.value)}
        />
      </div>     
      <div className="input-field">
        <input
          type="password"
          id="senha"
          placeholder="Senha"
          onChange={(e)=> setSenha(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Enter</button>
    </form> 
    <a href="">Esqueceu a senha?</a>
    </div>
    </div>
     
  );
}
  
  export default Login