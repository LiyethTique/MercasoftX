import express from 'express';
import { createPedido, updatePedido, getAllPedidos, getPedido, deletePedido, getQueryPedido } from '../controllers/pedidoController.js';

const routerPedido = express.Router();

routerPedido.get('/', getAllPedidos);
routerPedido.get('/:id', getPedido);
routerPedido.post('/', createPedido);
routerPedido.put('/:id', updatePedido);
routerPedido.delete('/:id', deletePedido);
routerPedido.get('/Fec_Pedido/:Fec_Pedido', getQueryPedido);

export default routerPedido;