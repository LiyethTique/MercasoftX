import express from 'express';
import { createCarrito, deleteCarrito, getAllCarritos, getCarrito, updateCarrito } from '../controllers/carritoController.js';

const router = express.Router();

router.get('/', getAllCarritos);
router.get('/:id', getCarrito);
router.post('/', createCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

export default router;