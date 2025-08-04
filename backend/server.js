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

// GET usuário por id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (result.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result[0]);
  });
});

// POST criar usuário
app.post('/users', (req, res) => {
  const { nome, email, CPF, Telefone, Cargo, DataAdm, DataNasc, Aso, password, salario } = req.body;

  if (!nome || !email || salario == null) {
    return res.status(400).json({ error: 'Nome, email e salário são obrigatórios' });
  }

  const query = `
    INSERT INTO users 
      (email, password, nome, DataNasc, DataAdm, Aso, Cargo, Telefone, CPF, salario) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [email, password, nome, DataNasc, DataAdm, Aso, Cargo, Telefone, CPF, salario], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nome, email, CPF, Telefone, Cargo, DataAdm, DataNasc, Aso, salario });
  });
});

// PUT atualizar usuário com senha opcional
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    password,
    CPF,
    Telefone,
    Cargo,
    DataAdm,
    DataNasc,
    Aso,
    salario
  } = req.body;

  if (!nome || !email || salario == null) {
    return res.status(400).json({ error: 'Nome, email e salário são obrigatórios' });
  }

  const fields = [
    { key: 'nome', value: nome },
    { key: 'email', value: email },
    { key: 'CPF', value: CPF },
    { key: 'Telefone', value: Telefone },
    { key: 'Cargo', value: Cargo },
    { key: 'DataAdm', value: DataAdm },
    { key: 'DataNasc', value: DataNasc },
    { key: 'Aso', value: Aso },
    { key: 'salario', value: salario }
  ];

  if (password && password.trim() !== '') {
    fields.push({ key: 'password', value: password });
  }

  const setClause = fields.map(f => `${f.key} = ?`).join(', ');
  const values = fields.map(f => f.value);
  values.push(id);

  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message });
    }

    res.json({
      message: 'Funcionário atualizado com sucesso',
      id
    });
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

// Férias
app.get('/ferias', (req, res) => {
  const sql = `
    SELECT ferias.*, users.nome 
    FROM ferias 
    JOIN users ON ferias.funcionario_id = users.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar férias:", err);
      return res.status(500).json({ error: "Erro ao buscar férias" });
    }
    res.json(results);
  });
});

app.post('/ferias', (req, res) => {
  const { funcionario_id, inicio, fim } = req.body;

  if (!funcionario_id || !inicio || !fim) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const sql = `
    INSERT INTO ferias (funcionario_id, inicio, fim)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [funcionario_id, inicio, fim], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar férias:", err);
      return res.status(500).json({ error: "Erro ao cadastrar férias" });
    }

    res.json({ message: "Férias cadastradas com sucesso", id: result.insertId });
  });
});

// Pontos com alternância automática entre entrada/saída
app.post('/ponto', (req, res) => {
  const { funcionario_id } = req.body;

  if (!funcionario_id) {
    return res.status(400).json({ error: 'Funcionário é obrigatório' });
  }

  const now = new Date();
  const dataHoje = now.toISOString().slice(0, 10);

  const sqlUltimo = `
    SELECT tipo FROM pontos 
    WHERE funcionario_id = ? AND DATE(horario) = ?
    ORDER BY horario DESC LIMIT 1
  `;

  db.query(sqlUltimo, [funcionario_id, dataHoje], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao consultar pontos' });
    }

    let novoTipo = 'entrada';

    if (results.length > 0) {
      const ultimoTipo = results[0].tipo;
      novoTipo = ultimoTipo === 'entrada' ? 'saida' : 'entrada';
    }

    const sqlInsert = `INSERT INTO pontos (funcionario_id, tipo, horario) VALUES (?, ?, ?)`;
    db.query(sqlInsert, [funcionario_id, novoTipo, now], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao registrar ponto' });
      }

      res.json({ message: `Ponto de ${novoTipo} registrado com sucesso` });
    });
  });
});

app.get('/ponto/:id', (req, res) => {
  const funcionarioId = req.params.id;

  const sql = `
    SELECT * FROM pontos
    WHERE funcionario_id = ?
    ORDER BY horario DESC
  `;

  db.query(sql, [funcionarioId], (err, result) => {
    if (err) {
      console.error("Erro ao buscar pontos:", err);
      return res.status(500).json({ error: 'Erro ao buscar pontos' });
    }

    res.json(result);
  });
});

// Descontos
app.post('/descontos', (req, res) => {
  const { funcionario_id, valor, descricao } = req.body;

  if (!funcionario_id || valor == null) {
    return res.status(400).json({ error: 'Funcionário e valor são obrigatórios' });
  }

  const sql = `INSERT INTO descontos (funcionario_id, valor, descricao) VALUES (?, ?, ?)`;
  db.query(sql, [funcionario_id, valor, descricao], (err, result) => {
    if (err) {
      console.error("Erro ao inserir desconto:", err);
      return res.status(500).json({ error: 'Erro ao registrar desconto' });
    }

    res.json({ message: 'Desconto registrado com sucesso' });
  });
});

// Folha de pagamento - listagem
app.get('/folha', (req, res) => {
  const sql = `
    SELECT 
      u.id,
      u.nome,
      u.Cargo,
      u.salario,
      IFNULL(SUM(d.valor), 0) AS total_descontos,
      (u.salario - IFNULL(SUM(d.valor), 0)) AS salario_liquido
    FROM users u
    LEFT JOIN descontos d ON u.id = d.funcionario_id
    GROUP BY u.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao gerar folha:", err);
      return res.status(500).json({ error: 'Erro ao gerar folha de pagamento' });
    }

    res.json(results);
  });
});

// Folha de pagamento - calcular e registrar
app.post('/folha/calcular', (req, res) => {
  const sql = `
    SELECT 
      u.id as funcionario_id,
      u.salario,
      IFNULL(SUM(d.valor), 0) AS total_descontos,
      (u.salario - IFNULL(SUM(d.valor), 0)) AS salario_liquido
    FROM users u
    LEFT JOIN descontos d ON u.id = d.funcionario_id
    GROUP BY u.id
  `;

  db.query(sql, (err, folhas) => {
    if (err) {
      console.error("Erro ao calcular folha:", err);
      return res.status(500).json({ error: 'Erro ao calcular folha' });
    }

    const insertSql = `
      INSERT INTO folhas_pagamento (funcionario_id, salario_base, total_descontos, salario_liquido)
      VALUES ?
    `;

    const values = folhas.map(f => [
      f.funcionario_id,
      f.salario,
      f.total_descontos,
      f.salario_liquido,
    ]);

    db.query(insertSql, [values], (err2) => {
      if (err2) {
        console.error("Erro ao registrar folha:", err2);
        return res.status(500).json({ error: 'Erro ao salvar folha no banco' });
      }

      res.json({ message: "Folha registrada com sucesso" });
    });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
