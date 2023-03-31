import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { JWT, SECURITY } = middlewares;
const { deliveryControllers } = controllers;
const router = Router();

router.post('/', JWT.verifyToken, SECURITY.checkUser, deliveryControllers.createDelivery);

export default router;
