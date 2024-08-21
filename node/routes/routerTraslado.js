import express from 'express';
import { createTraslado, updateTraslado, getAllTraslados, getTraslado, deleteTraslado, getQueryTraslado } from '../controllers/trasladoController.js';

const routerTraslado = express.Router();

routerTraslado.get('/', getAllTraslados);
routerTraslado.get('/:id', getTraslado);
routerTraslado.post('/', createTraslado);
routerTraslado.put('/:id', updateTraslado);
routerTraslado.delete('/:id', deleteTraslado);
routerTraslado.get('/Fec_Traslado/:Fec_Traslado', getQueryTraslado);

export default routerTraslado;
