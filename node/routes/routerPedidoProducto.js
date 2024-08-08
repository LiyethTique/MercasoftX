import express from 'express';
import { createPedidoProducto, deletePedidoProducto, getAllPedidoProductos, getPedidoProducto, updatePedidoProducto } from '../controllers/pedidoproductoController.js';

const router = express.Router();

router.get('/', getAllPedidoProductos);
router.get('/:id', getPedidoProducto);
router.post('/', createPedidoProducto);
router.put('/:id', updatePedidoProducto);
router.delete('/:id', deletePedidoProducto);

export default router;