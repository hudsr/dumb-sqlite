const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /purchases/all:
 *   get:
 *     summary: Retrieve a list of purchases with user details
 *     description: Fetches a list of purchases along with the associated user details from the database.
 *     responses:
 *       200:
 *         description: A list of purchases with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user
 *                   user_name:
 *                     type: string
 *                     description: The name of the user
 *                   user_email:
 *                     type: string
 *                     description: The email of the user
 *                   purchase_id:
 *                     type: integer
 *                     description: The ID of the purchase
 *                   purchase_product:
 *                     type: string
 *                     description: The product purchased
 *                   purchase_price:
 *                     type: number
 *                     format: float
 *                     description: The price of the purchase
 *                   purchase_date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the purchase
 */
router.get('/all', (req, res) => {
  const query = `
    SELECT 
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email,
      purchases.id AS purchase_id,
      purchases.product AS purchase_product,
      purchases.price AS purchase_price,
      purchases.purchase_date AS purchase_date
    FROM users
    JOIN purchases ON users.id = purchases.user_id;
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Lista todas as compras
 *     description: Retorna uma lista com todas as compras registradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   product:
 *                     type: string
 *                   price:
 *                     type: number
 *                   purchase_date:
 *                     type: string
 *                     format: date
 */
router.get('/', (req, res) => {
  db.all('SELECT * FROM purchases', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});


/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Registra uma nova compra
 *     description: Cria um novo registro de compra no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               product:
 *                 type: string
 *               price:
 *                 type: number
 *               purchase_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Compra registrada com sucesso
 *       400:
 *         description: Erro de validação dos dados
 */
router.post('/', (req, res) => {
  const { user_id, product, price, purchase_date } = req.body;

  if (!user_id || !product || !price || !purchase_date) {
    return res.status(400).json({ error: 'Dados incompletos para registrar a compra.' });
  }

  db.run(
    'INSERT INTO purchases (user_id, product, price, purchase_date) VALUES (?, ?, ?, ?)',
    [user_id, product, price, purchase_date],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, user_id, product, price, purchase_date });
      }
    }
  );
});

module.exports = router;
