import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nexusrh'
});

// LOGIN (sem alteração)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (result.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

    const user = result[0];
    if (password === user.password) {
      res.json({
        message: 'Login realizado com sucesso',
        id: user.id,
        nome: user.nome,
        email: user.email
      });
    } else {
      res.status(401).json({ error: 'Senha incorreta' });
    }
  });
});

// GET todos usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST criar usuário (com os novos campos)
app.post('/users', (req, res) => {
  const { nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const query = `
    INSERT INTO users 
      (nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso });
  });
});

// PUT atualizar usuário (com novos campos)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const query = `
    UPDATE users SET 
      nome = ?, 
      email = ?, 
      cpf = ?, 
      telefone = ?, 
      cargo = ?, 
      dataAdmissao = ?, 
      dataNascimento = ?, 
      dataAso = ?
    WHERE id = ?
  `;

  db.query(query, [nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso], (err, result) => {
  if (err) {
    console.error('Erro ao inserir usuário:', err); // <<< Isso vai mostrar o erro no terminal
    return res.status(500).json({ error: 'Erro ao cadastrar usuário', details: err.message });
  }
  res.json({ id: result.insertId, nome, email, cpf, telefone, cargo, dataAdmissao, dataNascimento, dataAso });
});

});

// DELETE usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Usuário apagado com sucesso', id });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
