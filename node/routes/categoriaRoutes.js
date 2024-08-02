import express from "express";
import { createCategoria, deleteCategoria, getAllCategoria, getCategoria, updateCategoria } from "../controllers/categoriaController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Define tus rutas
router.get('/', getAllCategoria);    
router.get('/:id', getCategoria);
router.post('/', createCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

router.use(logError);

export default router;
