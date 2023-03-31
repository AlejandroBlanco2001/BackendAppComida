import controllers from '../controllers';
import middlewares from '../middlewares';

import { Router } from 'express';

const { userController } = controllers;
const { JWT } = middlewares;
const router = Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/me', JWT.verifyToken, userController.getUserByID);

router.get('/:id', userController.getUserByToken);

router.post('/delete', JWT.verifyToken, userController.deleteUser);

router.patch('/update', JWT.verifyToken, userController.updateUser);

export default router;
