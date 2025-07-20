import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';

function Login () {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados enviados:", Email,Senha);
     try {
          const response = await axios.post('http://localhost:3001/login', {
            username: Email,
            password: Senha
          });
          alert(response.data.message); 
           const usuarioLogado = response.data;
           console.log(response.data);
           localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

           navigate("/Home")
        } catch (error) {
          if (error.response && error.response.data) {
           console.log(error.response.data.error); // backend enviou erro
          } else {
           console.error('Erro inesperado:', error);
         }
        }
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
      <button type="submit">Enter</button>
    </form> 
    <a href="">Esqueceu a senha?</a>
    </div>
    </div>
     
  );
}
  
  export default Login