import { Router } from 'express';
import { userController } from '../di/dependencyInjector.js';

const router = Router();
    
router.get('/:id', (req, res, next) => userController.getUser(req, res, next));
router.post('/', (req, res, next) => userController.createUser(req, res, next));
router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
router.delete('/:id',(req, res, next) => userController.deleteUser(req, res, next));

export default router;
