import React, { useEffect, useState } from "react";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";
import "./folhapagamento.css";
import { useNavigate } from "react-router-dom";

function FolhaPagamento() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [folhas, setFolhas] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    fetch("http://localhost:3001/folha")
      .then(res => res.json())
      .then(data => setFolhas(data))
      .catch(err => console.error("Erro ao buscar folhas:", err));
  }, []);

  const calcularFolha = async () => {
    try {
      const res = await fetch("http://localhost:3001/folha/calcular", {
        method: "POST",
      });
      const data = await res.json();
      alert(data.message || "Folha registrada!");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao calcular folha:", err);
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
        <h2>Folha de Pagamento</h2>
        <div className="acoes">
          <button onClick={() => navigate("/descontos")}>Criar Desconto</button>
          <button onClick={calcularFolha}>Calcular e Registrar Folha</button>
        </div>
        <table className="tabela-folha">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Salário Base</th>
              <th>Total Descontos</th>
              <th>Salário Líquido</th>
            </tr>
          </thead>
          <tbody>
            {folhas.map(f => (
              <tr key={f.id}>
                <td>{f.nome}</td>
                <td>R$ {f.salario.toFixed(2)}</td>
                <td>R$ {f.total_descontos.toFixed(2)}</td>
                <td>R$ {f.salario_liquido.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default FolhaPagamento;
