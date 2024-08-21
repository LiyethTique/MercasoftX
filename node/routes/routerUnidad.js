import express from 'express';
import { createUnidad, updateUnidad, getAllUnidades, getUnidad, deleteUnidad, getQueryUnidad } from '../controllers/unidadController.js';

const routerUnidad = express.Router();

routerUnidad.get('/', getAllUnidades);
routerUnidad.get('/:id', getUnidad);
routerUnidad.post('/', createUnidad);
routerUnidad.put('/:id', updateUnidad);
routerUnidad.delete('/:id', deleteUnidad);
routerUnidad.get('/Nom_Unidad/:Nom_Unidad', getQueryUnidad);

export default routerUnidad;
