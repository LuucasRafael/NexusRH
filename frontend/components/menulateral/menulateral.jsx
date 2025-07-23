import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './MenuLateral.css';

const MenuLateral = ({ aberto, toggleMenu }) => {
  return (
    <nav className={`menu-lateral ${aberto ? 'aberto' : 'fechado'}`}>
      <div className="btn-expandir" onClick={toggleMenu} style={{cursor: 'pointer', padding: '10px'}}>
        <i className="bi bi-list" style={{fontSize: '24px', color: 'white'}}></i>
      </div>
      <ul>
        <li className="item-menu">
          <a href="Pagina.html">
            <span className="icon"><i className="bi bi-house-door"></i></span>
            {aberto && <span className="txt-link">Home</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="menu.html">
            <span className="icon"><i className="bi bi-controller"></i></span>
            {aberto && <span className="txt-link">Games</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="#">
            <span className="icon"><i className="bi bi-person-circle"></i></span>
            {aberto && <span className="txt-link">Perfil</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="#">
            <span className="icon"><i className="bi bi-gear"></i></span>
            {aberto && <span className="txt-link">Configurações</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLateral;
