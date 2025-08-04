import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";
import './novaFerias.css';

function NovaFerias() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioId, setFuncionarioId] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(setFuncionarios)
      .catch(err => {
        console.error("Erro ao carregar funcionários:", err);
        alert("Erro ao carregar funcionários");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!funcionarioId || !inicio || !fim) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/ferias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funcionario_id: funcionarioId, inicio, fim })
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar férias");
      }

      alert("Solicitação de férias cadastrada com sucesso!");
      navigate('/ferias');
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar solicitação de férias.");
    }
  };

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main className="conteudo-principal" style={{ marginLeft: menuAberto ? 200 : 60, marginTop: 60, padding: 20 }}>
        <h2>Nova Solicitação de Férias</h2>
        <form className="form-ferias" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Funcionário</label>
            <select value={funcionarioId} onChange={e => setFuncionarioId(e.target.value)}>
              <option value="">Selecione</option>
              {funcionarios.map(f => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Data de Início</label>
            <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Data de Fim</label>
            <input type="date" value={fim} onChange={e => setFim(e.target.value)} />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-salvar">Cadastrar</button>
            <button type="button" className="btn-voltar" onClick={() => navigate('/ferias')}>Voltar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NovaFerias;
