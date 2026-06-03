import { Router } from 'express';
import { bookController } from '../di/dependencyInjector.js';

const router = Router();

router.get('/user/:userEmail', (req, res, next) => bookController.getAllBooks(req, res, next));
    
router.get('/:id', (req, res, next) => bookController.getBook(req, res, next));
router.post('/', (req, res, next) => bookController.createBook(req, res, next));
router.put('/:id', (req, res, next) => bookController.updateBook(req, res, next));
router.delete('/:id',(req, res, next) => bookController.deleteBook(req, res, next));

export default router;
