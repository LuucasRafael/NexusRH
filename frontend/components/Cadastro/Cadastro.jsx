import React, { useState } from "react";
import './Cadastro.css';
import { useNavigate } from "react-router-dom";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";

function CadastroFuncionario() {
  const [menuAberto, setMenuAberto] = useState(true);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataAso, setDataAso] = useState('');

  const navigate = useNavigate();
  const toggleMenu = () => setMenuAberto(prev => !prev);

  // Função para limpar os campos após cadastro
  function limparCampos() {
    setNome('');
    setEmail('');
    setCpf('');
    setTelefone('');
    setCargo('');
    setDataAdmissao('');
    setDataNascimento('');
    setDataAso('');
  }

  // Função para enviar os dados ao backend
  function handleSubmit(e) {
    e.preventDefault();

    // Validação simples dos campos
    if (!nome.trim() || !email.trim() || !cpf.trim() || !telefone.trim() || !cargo.trim() || !dataAdmissao || !dataNascimento || !dataAso) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Monta o objeto para enviar
    const novoFuncionario = {
      nome: nome.trim(),
      email: email.trim(),
      cpf: cpf.trim(),
      telefone: telefone.trim(),
      cargo: cargo.trim(),
      dataAdmissao,     // formato 'YYYY-MM-DD' vindo do input date
      dataNascimento,   // formato 'YYYY-MM-DD'
      dataAso           // formato 'YYYY-MM-DD'
    };

    // Envia para backend
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoFuncionario),
    })
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Erro desconhecido ao cadastrar');
        }
        return res.json();
      })
      .then(data => {
        alert('Funcionário cadastrado com sucesso!');
        limparCampos();
        navigate('/');
      })
      .catch(err => {
        alert('Erro ao cadastrar funcionário: ' + err.message);
      });
  }

  return (
    <div className="layout-geral">
      <MenuLateral aberto={menuAberto} toggleMenu={toggleMenu} />
      <Cabeca menuAberto={menuAberto} />
      <main
        className="conteudo-principal"
        style={{ marginLeft: menuAberto ? 200 : 60, marginTop: 60 }}
      >
        <div className="form-container">
          <h2 className="form-title">Cadastrar Funcionário</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>CPF</label>
              <input value={cpf} onChange={e => setCpf(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Cargo</label>
              <input value={cargo} onChange={e => setCargo(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Data de Admissão</label>
              <input type="date" value={dataAdmissao} onChange={e => setDataAdmissao(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Data do ASO</label>
              <input type="date" value={dataAso} onChange={e => setDataAso(e.target.value)} />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-salvar">Salvar</button>
              <button
                type="button"
                className="btn-voltar"
                onClick={() => navigate('/')}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CadastroFuncionario;
