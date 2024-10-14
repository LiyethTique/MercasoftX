import express from 'express';
import { agregarProductoAlCarrito, getProductosEnCarrito, eliminarProductoDelCarrito } from '../controllers/carritoProductoController.js';

const router = express.Router();

router.post('/', agregarProductoAlCarrito);
router.get('/:id', getProductosEnCarrito);
router.delete('/:id', eliminarProductoDelCarrito);

export default router;
