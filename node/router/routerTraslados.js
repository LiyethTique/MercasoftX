import { createTraslado, deleteTraslado, getAllTraslados, getTraslado, updateTraslado } from '../controllers/trasladosController.js'; // Asegúrate de que esta ruta sea correcta

import express from 'express';
const router = express.Router();


router.get('/', getAllTraslados);
router.get('/:id', getTraslado);
router.post('/', createTraslado);
router.put('/:id', updateTraslado);
router.delete('/:id', deleteTraslado);

export default router;