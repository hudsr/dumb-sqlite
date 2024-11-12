const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const PORT = 3000;

const usersRouter = require('./routes/users');
const purchasesRouter = require('./routes/purchases');

// Middleware para parse de JSON
app.use(express.json());

app.use('/users', usersRouter);
app.use('/purchases', purchasesRouter);

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários e Compras',
      version: '1.0.0',
      description: 'Documentação da API para gerenciar usuários e compras',
    },
  },
  // Caminho para arquivos que contêm as definições das rotas
  apis: ['./routes/users.js', './routes/purchases.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

// Rota para acessar a documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Documentação da API disponível em http://localhost:3000/api-docs');
});
