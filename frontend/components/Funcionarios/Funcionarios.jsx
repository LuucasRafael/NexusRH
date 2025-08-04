import React, { useState, useEffect } from "react";
import './funcionario.css';
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";
import { useNavigate } from "react-router-dom";

function ListaUsers() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch('http://localhost:3001/users') // ajustar conforme backend
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }

  function handleApagar(id) {
    if (!window.confirm('Confirma apagar este funcionário?')) return;

    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao apagar funcionário');
        return res.json();
      })
      .then(() => fetchUsers())
      .catch(err => alert(err.message));
  }

  function convertdata(datastring){
    const dt = new Date(datastring);
    return dt.toLocaleDateString("pt-BR");

  }

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main
        className="conteudo-principal"
        style={{
          marginLeft: menuAberto ? 200 : 60,
          marginTop: 60,
          padding: '20px'
        }}
      >
        <div>
          <button
            onClick={() => navigate('/cadastro')}
            className="btn-cadastrar"
          >
            + Cadastrar Funcionário
          </button>

          <h2>Lista de Funcionários</h2>

          {users.length === 0 ? (
            <p>Nenhum funcionário cadastrado.</p>
          ) : (
            <div className="lista-cards">
              {users.map(user => (
                <div key={user.id} className="card-funcionario">
                  <h3>{user.id}.  {user.nome}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>CPF:</strong> {user.CPF}</p>
                  <p><strong>Telefone:</strong> {user.Telefone}</p>
                  <p><strong>Cargo:</strong> {user.Cargo}</p>
                  <p><strong>Salário:</strong> R$ {parseFloat(user.salario).toFixed(2)}</p>
                  <p><strong>Data de Admissão:</strong> {convertdata(user.DataAdm)}</p>
                  <p><strong>Data de Nascimento:</strong> {convertdata(user.DataNasc)}</p>
                  <p><strong>Data do ASO:</strong> {convertdata(user.Aso)}</p>
                  <div className="botoes-card">
                    <button
                      className="btn-editar"
                      onClick={() => navigate(`/editar/${user.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-apagar"
                      onClick={() => handleApagar(user.id)}
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ListaUsers;