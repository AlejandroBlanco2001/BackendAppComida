import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { JWT, SECURITY } = middlewares;
const { productController } = controllers;
const router = Router();

router.post('/', JWT.verifyToken, SECURITY.checkAdmin, productController.createProduct);

router.get('/:id', JWT.verifyToken, SECURITY.checkNotDelivery, productController.getProductById);

router.get('/', JWT.verifyToken, SECURITY.checkNotDelivery, productController.getAllProducts);

router.patch('/:id', JWT.verifyToken, SECURITY.checkAdmin, productController.updateProduct);

router.delete('/:id', JWT.verifyToken, SECURITY.checkAdmin, productController.deleteProduct);

export default router;
