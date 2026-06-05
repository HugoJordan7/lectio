import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import readingProgressRoutes from './routes/readingProgressRoutes.js';

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(logger);

// Rotas
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/readingProgress', readingProgressRoutes);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({
    api: 'Lectio API',
    versao: '1.0.0',
    rotas: [
      '/users',
      '/books',
      '/readingProgress'
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