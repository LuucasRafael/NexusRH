import React, { useEffect, useState } from "react";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";
import "./desconto.css";

function CadastroDesconto() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionario_id, setFuncionarioId] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => setFuncionarios(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/descontos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funcionario_id, valor, descricao }),
      });

      const data = await res.json();
      alert(data.message || "Desconto registrado!");
    } catch (err) {
      console.error("Erro ao cadastrar desconto:", err);
    }
  };

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main
        className="conteudo-principal"
        style={{ marginLeft: menuAberto ? 200 : 60, marginTop: 60 }}
      >
        <h2>Cadastro de Desconto</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <label>Funcionário:</label>
          <select onChange={(e) => setFuncionarioId(e.target.value)} required>
            <option value="">Selecione</option>
            {funcionarios.map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>

          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />

          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <button type="submit">Salvar Desconto</button>
        </form>
      </main>
    </div>
  );
}

export default CadastroDesconto;
