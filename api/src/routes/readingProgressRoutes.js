import { Router } from 'express';
import { readingProgressController } from '../di/dependencyInjector.js';

const router = Router();

router.get('/users/:userEmail', (req, res, next) => readingProgressController.getAllReadingProgresssByUserEmail(req, res, next));
router.get('/books/:bookId', (req, res, next) => readingProgressController.getAllReadingProgressByBookId(req, res, next));
router.get('/:id', (req, res, next) => readingProgressController.getReadingProgress(req, res, next));
router.post('/', (req, res, next) => readingProgressController.createReadingProgress(req, res, next));
router.delete('/:id', (req, res, next) => readingProgressController.deleteReadingProgress(req, res, next));
router.put('/:id', (req, res, next) => readingProgressController.updateReadingProgress(req, res, next));

export default router;