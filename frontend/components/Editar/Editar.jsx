import React, { useState, useEffect } from "react";
import './editar.css';
import { useNavigate, useParams } from "react-router-dom";
import Cabeca from "../Cabeca/Cabeca";
import MenuLateral from "../menulateral/menulateral";

function Editar() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // senha opcional na edição
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataAso, setDataAso] = useState('');
  const [salario, setSalario] = useState(''); // novo campo salário

  const navigate = useNavigate();
  const { id } = useParams();
  const toggleMenu = () => setMenuAberto(prev => !prev);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/users/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar funcionário');
          return res.json();
        })
        .then(data => {
          setNome(data.nome);
          setEmail(data.email);
          setCpf(data.CPF);
          setTelefone(data.Telefone);
          setCargo(data.Cargo);
          setDataAdmissao(data.DataAdm);
          setDataNascimento(data.DataNasc);
          setDataAso(data.Aso);
          setSalario(data.salario || '');
        })
        .catch(err => {
          alert("Erro ao carregar dados do funcionário");
          console.error(err);
        });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !email || !cpf || !telefone || !cargo || !dataAdmissao || !dataNascimento || !dataAso || salario === '') {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (!id && (!senha || senha.length < 6)) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (id && senha && senha.length > 0 && senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const funcionario = {
      nome: nome.trim(),
      email: email.trim(),
      password: senha.trim(), // pode ser vazio se não quiser alterar na edição
      CPF: cpf.trim(),
      Telefone: telefone.trim(),
      Cargo: cargo.trim(),
      DataAdm: dataAdmissao,
      DataNasc: dataNascimento,
      Aso: dataAso,
      salario: parseFloat(salario)
    };

    const url = id
      ? `http://localhost:3001/users/${id}`
      : `http://localhost:3001/users`;

    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionario),
      });

      if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        throw new Error(erro.error || `Erro ${res.status}`);
      }

      alert(`Funcionário ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigate('/Funcionarios');
    } catch (err) {
      alert('Erro: ' + err.message);
      console.error('Erro detalhado:', err);
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
          <h2 className="form-title">
            {id ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
          </h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            {/* campos anteriores */}
            <div className="form-group">
              <label>Nome</label>
              <input value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder={id ? "Deixe vazio para não alterar" : "Mínimo 6 caracteres"}
              />
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
            <div className="form-group">
              <label>Salário</label>
              <input
                type="number"
                step="0.01"
                value={salario}
                onChange={e => setSalario(e.target.value)}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-salvar">
                {id ? 'Salvar Alterações' : 'Cadastrar'}
              </button>
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

export default Editar;
