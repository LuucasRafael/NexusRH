import React, { useState, useEffect  } from "react";
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
  const [salario, setSalario] = useState('');

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
    setSalario('')
  }

  // Função para enviar os dados ao backend
  async function  handleSubmit(e) {
    e.preventDefault();

    // Validação simples dos campos
    if (!nome.trim() || !email.trim() || !cpf.trim() || !telefone.trim() || !cargo.trim() || !dataAdmissao || !dataNascimento || !dataAso || !salario.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Monta o objeto para enviar
    const novoFuncionario = {
      nome: nome.trim(),
      email: email.trim(),
      password: "password", // Você não está coletando a senha no frontend, mas seu backend espera.
                          // Se não for necessário no cadastro inicial, remova do backend ou adicione no frontend.
      CPF: cpf.trim(),       // MUDADO: 'CPF' maiúsculo
      Telefone: telefone.trim(), // MUDADO: 'Telefone' maiúsculo
      Cargo: cargo.trim(),     // MUDADO: 'Cargo' maiúsculo
      DataAdm: dataAdmissao,   // MUDADO: 'DataAdm' maiúsculo
      DataNasc: dataNascimento, // MUDADO: 'DataNasc' maiúsculo
      Aso: dataAso,
      salario: salario.trim()
      
    };

    // Envia para backend
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoFuncionario),
      });

      if (!res.ok) {
        let errorData = {};
        try {
          // Tenta parsear a resposta como JSON. Isso é útil se o backend enviar erros formatados em JSON.
          errorData = await res.json();
        } catch (jsonError) {
          // Se o parsing falhar (ex: resposta não é JSON ou está vazia),
          // use uma mensagem de erro genérica ou o status text.
          console.error('Falha ao parsear JSON de erro:', jsonError);
          errorData = { error: res.statusText || 'Erro no servidor (resposta não-JSON ou vazia)' };
        }
        // Lança um erro com a mensagem do backend ou uma mensagem padrão
        throw new Error(errorData.error || `Erro ao cadastrar funcionário: Status ${res.status}`);
      }

      const data = await res.json(); // Se a resposta for OK, parseia o JSON de sucesso
      alert('Funcionário cadastrado com sucesso!');
      limparCampos();
      navigate('/'); // Redireciona para a página principal ou lista
    } catch (err) {
      alert('Erro ao cadastrar funcionário: ' + err.message);
      console.error('Erro detalhado:', err); // Para depuração
    }
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
              <label>Salario</label>
              <input value={salario} onChange={e => setSalario(e.target.value)} />
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
                onClick={() => navigate('/Funcionarios')}
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
