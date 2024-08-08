import express from 'express';
import { createVenta, deleteVenta, getAllVentas, getVenta, updateVenta } from '../controllers/ventaController.js';

const router = express.Router();

router.get('/', getAllVentas);
router.get('/:id', getVenta);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

export default router;
