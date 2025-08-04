import React, { useEffect, useState } from 'react';
import './pontos.css';
import Cabeca from '../Cabeca/Cabeca';
import MenuLateral from '../menulateral/menulateral';

function Pontos() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [registros, setRegistros] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    if (!usuario?.id) return;

    fetch(`http://localhost:3001/ponto/${usuario.id}`)
      .then(res => res.json())
      .then(data => setRegistros(data))
      .catch(err => {
        console.error("Erro ao buscar pontos:", err);
        setRegistros([]);
      });
  }, [usuario?.id]);

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main
        className="conteudo-principal"
        style={{ marginLeft: menuAberto ? 200 : 60, marginTop: 60 }}
      >
        <h2>Registros de Ponto</h2>

        {registros.length === 0 ? (
          <p>Nenhum ponto registrado.</p>
        ) : (
          <table className="tabela-ponto">
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {registros.map(ponto => {
                const data = new Date(ponto.horario);
                return (
                  <tr key={ponto.id}>
                    <td>{data.toLocaleDateString('pt-BR')}</td>
                    <td>{data.toLocaleTimeString('pt-BR')}</td>
                    <td>{ponto.tipo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Pontos;
