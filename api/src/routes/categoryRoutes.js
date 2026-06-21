import { Router } from 'express';
import { categoryController } from '../di/dependencyInjector.js';

const router = Router();

router.get('/user/:userEmail', (req, res, next) => categoryController.listCategories(req, res, next));
router.get('/book/:bookId', (req, res, next) => categoryController.listCategoriesByBook(req, res, next));
router.get('/:id', (req, res, next) => categoryController.getCategory(req, res, next));
router.post('/', (req, res, next) => categoryController.createCategory(req, res, next));
router.put('/:id', (req, res, next) => categoryController.updateCategory(req, res, next));
router.delete('/:id', (req, res, next) => categoryController.deleteCategory(req, res, next));
router.post('/book/:bookId/:categoryId', (req, res, next) => categoryController.addCategoryToBook(req, res, next));
router.delete('/book/:bookId/:categoryId', (req, res, next) => categoryController.removeCategoryFromBook(req, res, next));

export default router;