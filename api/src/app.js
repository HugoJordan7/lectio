import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(logger);

// Rotas
app.use('/users', userRoutes);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({
    api: 'Lectio API',
    versao: '1.0.0',
    rotas: [
      '/users'
    ]
  });
});

// --- Error handler ---
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Lectio API rodando em http://localhost:${PORT}`);
});

export default app;