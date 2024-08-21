import express from 'express';
import { createPedidoProducto, updatePedidoProducto, getAllPedidoProductos, getPedidoProducto, deletePedidoProducto, getQueryPedidoProducto } from '../controllers/pedidoProductoController.js';

const routerPedidoProducto = express.Router();

routerPedidoProducto.get('/', getAllPedidoProductos);
routerPedidoProducto.get('/:id', getPedidoProducto);
routerPedidoProducto.post('/', createPedidoProducto);
routerPedidoProducto.put('/:id', updatePedidoProducto);
routerPedidoProducto.delete('/:id', deletePedidoProducto);
routerPedidoProducto.get('/Id_PedidoProducto/:Id_PedidoProducto', getQueryPedidoProducto);

export default routerPedidoProducto;
