import express from 'express';
import { createTraslado, deleteTraslado, getAllTraslados, getTraslado, updateTraslado } from '../controllers/trasladoController.js';

const router = express.Router();

router.get('/', getAllTraslados);
router.get('/:id', getTraslado);
router.post('/', createTraslado);
router.put('/:id', updateTraslado);
router.delete('/:id', deleteTraslado);

export default router;