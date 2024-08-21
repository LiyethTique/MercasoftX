// Importar dependencias
import express from 'express';
import { createEntrada, updateEntrada, getAllEntradas, getEntrada, deleteEntrada, getQueryEntrada } from '../controllers/entradaController.js';

const routerEntrada = express.Router();

// Definición de rutas
routerEntrada.get('/', getAllEntradas);
routerEntrada.get('/:id', getEntrada);
routerEntrada.post('/', createEntrada);
routerEntrada.put('/:id', updateEntrada);
routerEntrada.delete('/:id', deleteEntrada);
routerEntrada.get('/Fec_Entrada/:Fec_Entrada', getQueryEntrada);

export default routerEntrada;