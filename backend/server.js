import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_app'
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });

    if (result.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.json({ message: 'Login realizado com sucesso' });
      } else {
        res.status(401).json({ error: 'Senha incorreta' });
      }
    });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});