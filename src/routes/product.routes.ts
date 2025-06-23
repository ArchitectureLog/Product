import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);

export default router;
