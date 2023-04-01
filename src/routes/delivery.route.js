import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { JWT, SECURITY } = middlewares;
const { deliveryControllers } = controllers;
const router = Router();

router.post('/', JWT.verifyToken, SECURITY.checkUser, deliveryControllers.createDelivery);

router.get('/:id', JWT.verifyToken, SECURITY.checkUser, deliveryControllers.getDeliveryByID);

router.get('/', JWT.verifyToken, SECURITY.checkUser, deliveryControllers.getAllDeliveries);

router.get('/user/all', JWT.verifyToken, SECURITY.checkUser, deliveryControllers.getDeliveryByUser);

router.patch(
  '/update/:id',
  JWT.verifyToken,
  SECURITY.checkUser,
  deliveryControllers.updateDelivery
);

router.delete(
  '/delete/:id',
  JWT.verifyToken,
  SECURITY.checkUser,
  deliveryControllers.deleteDelivery
);

export default router;
