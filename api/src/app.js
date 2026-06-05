import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import readingProgressRoutes from './routes/readingProgressRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(logger);

// Rotas
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/readingProgress', readingProgressRoutes);
app.use('/categories', categoryRoutes);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({
    api: 'Lectio API',
    versao: '1.0.0',
    rotas: [
      '/users',
      '/books',
      '/readingProgress',
      '/categories'
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