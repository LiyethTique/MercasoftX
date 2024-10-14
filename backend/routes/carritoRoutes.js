import express from 'express';
import { getAllCarrito, getCarrito, createCarrito, updateCarrito, deleteCarrito } from '../controllers/carritoController.js';

const router = express.Router();

// Rutas para el CRUD de carrito
router.get('/', getAllCarrito);
router.get('/:id', getCarrito);
router.post('/', createCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

export default router;
