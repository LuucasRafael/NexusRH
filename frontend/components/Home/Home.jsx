import React, { useState } from "react";
import './Home.css';
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";

function Home() {
  const [menuAberto, setMenuAberto] = useState(true);

  const toggleMenu = () => setMenuAberto(prev => !prev);

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main
        className="conteudo-principal"
        style={{
          marginLeft: menuAberto ? 200 : 60,
          marginTop: 60
        }}
      >
        <h1>Seja Bem-vindo!</h1>
      </main>
    </div>
  );
}

export default Home;

