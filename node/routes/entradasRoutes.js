import express from "express";
import { createEntrada, deleteEntrada, getAllEntrada, getEntrada, updateEntrada } from "../controllers/entradaController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: `Internal Server error` });
};

// Define tus rutas
router.get('/', getAllEntrada);
router.get('/:id', getEntrada);
router.post('/', createEntrada);
router.put('/:id', updateEntrada);
router.delete('/:id', deleteEntrada);

router.use(logError);

export default router;
