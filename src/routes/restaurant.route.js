import controllers from '../controllers';
import middlewares from '../middlewares';

import { Router } from 'express';

const { restaurantController } = controllers;
const { JWT, SECURITY } = middlewares;

const router = Router();

router.post('/', JWT.verifyToken, SECURITY.checkAdmin, restaurantController.createRestaurant);

router.get('/:id', JWT.verifyToken, SECURITY.checkUser, restaurantController.getRestaurantByID);

router.get('/', JWT.verifyToken, SECURITY.checkUser, restaurantController.getAllRestaurants);

router.patch(
  '/update/:id',
  JWT.verifyToken,
  SECURITY.checkAdmin,
  restaurantController.updateRestaurant
);

router.delete(
  '/delete/:id',
  JWT.verifyToken,
  SECURITY.checkAdmin,
  restaurantController.deleteRestaurant
);

export default router;
