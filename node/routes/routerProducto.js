import express from 'express';
import { createProducto, updateProducto, getAllProductos, getProducto, deleteProducto, getQueryProducto } from '../controllers/productoController.js';

const routerProducto = express.Router();

routerProducto.get('/', getAllProductos);
routerProducto.get('/:id', getProducto);
routerProducto.post('/', createProducto);
routerProducto.put('/:id', updateProducto);
routerProducto.delete('/:id', deleteProducto);
routerProducto.get('/Id_PedidoProducto/:Id_Categoria', getQueryProducto);

export default routerProducto;