import express from "express";
import { createCarritoProducto, deleteCarritoProducto, getAllCarritoProducto, getCarritoProducto, updateCarritoProducto } from "../controllers/CarritoProductoController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Define tus rutas
router.get('/', getAllCarritoProducto);
router.get('/:id', getCarritoProducto);
router.post('/', createCarritoProducto);
router.put('/:id', updateCarritoProducto);
router.delete('/:id', deleteCarritoProducto);

router.use(logError);

export default router;
