import express from 'express';
import { createCategoria, updateCategoria, getAllCategorias, getCategoria, deleteCategoria, getQueryCategoria } from '../controllers/categoriaController.js';

const routerCategoria = express.Router();

routerCategoria.get('/', getAllCategorias);
routerCategoria.get('/:id', getCategoria);
routerCategoria.post('/', createCategoria);
routerCategoria.put('/:id', updateCategoria);
routerCategoria.delete('/:id', deleteCategoria);
routerCategoria.get('/Nom_Categoria/:Nom_Categoria', getQueryCategoria);

export default routerCategoria;
