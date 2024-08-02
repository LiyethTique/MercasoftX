import express from "express";
import { createPedido, deletePedido, getAllPedido, getPedido, updatePedido } from "../controllers/pedidoController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: `Internal Server error` });
};

// Define tus rutas
router.get('/', getAllPedido);
router.get('/:id', getPedido);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

router.use(logError);

export default router;
