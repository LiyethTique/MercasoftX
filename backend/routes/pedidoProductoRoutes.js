import express from 'express';
import { agregarProducto, getProductosEnPedido, eliminarProductoDePedido, getPedidoProductoById } from '../controllers/pedidoProductoController.js';

const router = express.Router();

router.post('/', agregarProducto);
router.get('/pedidoProducto/:id', getPedidoProductoById);
router.get('/:id', getProductosEnPedido);
router.delete('/:id', eliminarProductoDePedido);

export default router;
