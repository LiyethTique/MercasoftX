import express from "express";
import { createCliente, deleteCliente, getAllClientes, getCliente, updateCliente } from "../controllers/clienteController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Define tus rutas
router.get('/', getAllClientes);
router.get('/:id', getCliente);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

router.use(logError);

export default router;
