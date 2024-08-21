import express from 'express';
import { createCarrito, updateCarrito, getAllCarritos, getCarrito, deleteCarrito, getQueryCarrito } from '../controllers/carritoController.js';

const routerCarrito = express.Router();

routerCarrito.get('/', getAllCarritos);
routerCarrito.get('/:id', getCarrito);
routerCarrito.post('/', createCarrito);
routerCarrito.put('/:id', updateCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.get('/Id_carrito/:Id_carrito', getQueryCarrito);

export default routerCarrito;