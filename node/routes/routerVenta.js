import express from 'express';
import { createVenta, updateVenta, getAllVentas, getVenta, deleteVenta, getQueryVenta } from '../controllers/ventaController.js';

const routerVenta = express.Router();

routerVenta.get('/', getAllVentas);
routerVenta.get('/:id', getVenta);
routerVenta.post('/', createVenta);
routerVenta.put('/:id', updateVenta);
routerVenta.delete('/:id', deleteVenta);
routerVenta.get('/Fec_Venta/:Fec_Venta', getQueryVenta);

export default routerVenta;
