require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Rota de health check — só pra confirmar que o servidor está de pé
app.get('/', (req, res) => {
  res.json({ message: 'Lectio API rodando' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lectio API rodando na porta ${PORT}`));

module.exports = app;