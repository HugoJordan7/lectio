const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor do Lectio rodando!');
});

app.listen(port, () => {
  console.log(`API do Lectio disponível em http://localhost:${port}`);
});