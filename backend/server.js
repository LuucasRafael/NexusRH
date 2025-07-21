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

app.post('/login', (req, res) => {
  const { username, password, nome } = req.body;

  console.log('Recebido do front-end:', username, password);

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) {
      console.error('Erro na consulta MySQL:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = result[0];

    if (password === user.password) {
      res.json({
    message: 'Login realizado com sucesso',
        id: user.id,
        nome: user.nome,
        username: user.username
  });
    } else {
      res.status(401).json({ error: 'Senha incorreta' });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});