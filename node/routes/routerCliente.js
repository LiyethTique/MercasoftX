import express from 'express';
import { createCliente, updateCliente, getAllClientes, getCliente, deleteCliente, getQueryCliente } from '../controllers/clienteController.js';

const routerCliente = express.Router();

routerCliente.get('/', getAllClientes);
routerCliente.get('/:id', getCliente);
routerCliente.post('/', createCliente);
routerCliente.put('/:id', updateCliente);
routerCliente.delete('/:id', deleteCliente);
routerCliente.get('/Nom_Cliente/:Nom_Cliente', getQueryCliente);

export default routerCliente;
