import express from 'express';
import { createResponsable, updateResponsable, getAllResponsables, getResponsable, deleteResponsable, getQueryResponsable } from '../controllers/responsableController.js';

const routerResponsable = express.Router();

routerResponsable.get('/', getAllResponsables);
routerResponsable.get('/:id', getResponsable);
routerResponsable.post('/', createResponsable);
routerResponsable.put('/:id', updateResponsable);
routerResponsable.delete('/:id', deleteResponsable);
routerResponsable.get('/Nom_Responsable/:Nom_Responsable', getQueryResponsable);

export default routerResponsable;
