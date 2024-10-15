import express from 'express';
import { agregarProducto, getProductosEnPedido, eliminarProductoDePedido, getPedidoProductoById, getAllProductosPedido } from '../controllers/pedidoProductoController.js';

const router = express.Router();

router.post('/', agregarProducto);
router.get('/pedidoProducto/:id', getPedidoProductoById);
router.get('/:id', getProductosEnPedido);
router.delete('/:id', eliminarProductoDePedido);
router.get('/:id', getAllProductosPedido)

export default router;
