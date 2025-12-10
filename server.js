require('dotenv').config();
const express = require('express');
const connectDB = require('./config/mongo');
const routes = require('./routes/index.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', routes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

const PORT = process.env.PORT || 3000;

// Só inicia o servidor se não estiver sendo importado por testes
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;

