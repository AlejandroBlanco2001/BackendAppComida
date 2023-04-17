import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { JWT, SECURITY } = middlewares;
const { deliveryController } = controllers;
const router = Router();

router.post('/', JWT.verifyToken, SECURITY.checkUser, deliveryController.createDelivery);

router.get('/:id', JWT.verifyToken, SECURITY.checkUser, deliveryController.getDeliveryByID);

router.get('/', JWT.verifyToken, SECURITY.checkUser, deliveryController.getDeliveryByUser);

router.get('/user/all', JWT.verifyToken, SECURITY.checkUser, deliveryController.getSentDelivery);

router.patch('/update/:id', JWT.verifyToken, deliveryController.updateDelivery);

router.delete(
  '/delete/:id',
  JWT.verifyToken,
  SECURITY.checkUser,
  deliveryController.deleteDelivery
);

export default router;
