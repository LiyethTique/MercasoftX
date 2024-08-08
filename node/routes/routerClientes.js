const express = require('express');
import { createCliente, deleteCliente, getAllClientes, getCliente, getQueryCliente, updateCliente } from "../controllers/clienteController.js";

const router = express.Router()

router.get('/', getAllClientes)
router.get('/:id', getCliente)
router.post('/', createCliente)
router.put('/:id', updateCliente)
router.delete('/:id', deleteCliente)

//FALTAAAAAAAAAAAA consultar por nom_producto
router.get('/Nom_Cliente/:Nom_Cliente', getQueryCliente)

export default router