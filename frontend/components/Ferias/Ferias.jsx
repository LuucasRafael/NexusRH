import React, { useEffect, useState } from "react";
import './ferias.css';
import { useNavigate } from "react-router-dom";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";

function Ferias() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [listaFerias, setListaFerias] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    fetch("http://localhost:3001/ferias")
      .then(res => res.json())
      .then(setListaFerias)
      .catch(err => {
        console.error("Erro ao buscar férias:", err);
        alert("Erro ao buscar férias");
      });
  }, []);

  function formatarData(dataISO) {
    const dt = new Date(dataISO);
    return dt.toLocaleDateString("pt-BR");
  }

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main className="conteudo-principal" style={{ marginLeft: menuAberto ? 200 : 60, marginTop: 60, padding: 20 }}>
        <div>
          <button className="btn-cadastrar" onClick={() => navigate('/ferias/nova')}>
            + Solicitar Férias
          </button>
          <h2>Solicitações de Férias</h2>

          {listaFerias.length === 0 ? (
            <p>Nenhuma solicitação de férias cadastrada.</p>
          ) : (
            <table className="tabela-ferias">
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listaFerias.map(f => (
                  <tr key={f.id}>
                    <td>{f.nome}</td>
                    <td>{formatarData(f.inicio)}</td>
                    <td>{formatarData(f.fim)}</td>
                    <td>{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Ferias;
