import express from 'express';
import { createEntrada, deleteEntrada, getAllEntradas, getEntrada, updateEntrada } from '../controllers/entradaController.js';

const router = express.Router();

router.get('/', getAllEntradas);
router.get('/:id', getEntrada);
router.post('/', createEntrada);
router.put('/:id', updateEntrada);
router.delete('/:id', deleteEntrada);

export default router;