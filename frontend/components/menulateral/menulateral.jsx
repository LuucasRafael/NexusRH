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
          <a href="/Home">
            <span className="icon"><i className="bi bi-house-door"></i></span>
            {aberto && <span className="txt-link">Home</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="/Funcionarios">
            <span className="icon"><i className="bi bi-people-fill"></i></span>
            {aberto && <span className="txt-link">Funcionarios</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="/pontos">
            <span className="icon"><i className="bi bi-receipt"></i></span>
            {aberto && <span className="txt-link">Folha Pontos</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="/Ferias">
            <span className="icon"><i class="bi bi-airplane"></i></span>
            {aberto && <span className="txt-link">Ferias</span>}
          </a>
        </li>
        <li className="item-menu">
          <a href="/FolhaPagamento">
            <span className="icon"><i class="bi bi-card-text"></i></span>
            {aberto && <span className="txt-link">Folha de Pagamento</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLateral;
