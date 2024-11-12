const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa o banco de dados

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna todos os usuários cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou faltando
 */
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name e email são obrigatórios.' });
  }

  db.run(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          id: this.lastID,
          name,
          email,
        });
      }
    }
  );
});

/**
 * @swagger
 * /users/{userId}/purchases:
 *   get:
 *     summary: Lista todas as compras de um usuário específico
 *     description: Retorna todas as compras associadas ao usuário com o ID fornecido.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de compras do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product:
 *                     type: string
 *                   price:
 *                     type: number
 *                   purchase_date:
 *                     type: string
 */
router.get('/:userId/purchases', (req, res) => {
  const userId = req.params.userId;
  db.all('SELECT * FROM purchases WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
