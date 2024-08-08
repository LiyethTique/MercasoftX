import express from 'express';
import { createResponsable, deleteResponsable, getAllResponsables, getResponsable, updateResponsable } from '../controllers/responsableController.js';

const router = express.Router();

router.get('/', getAllResponsables);
router.get('/:id', getResponsable);
router.post('/', createResponsable);
router.put('/:id', updateResponsable);
router.delete('/:id', deleteResponsable);

export default router;