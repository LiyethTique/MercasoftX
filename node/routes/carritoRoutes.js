import express from "express";
import { createCarrito, deleteCarrito, getAllCarrito, getCarrito, updateCarrito } from "../controllers/carritoController.js";

const router = express.Router();

// Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Define tus rutas
router.get('/', getAllCarrito);
router.get('/:id', getCarrito);
router.post('/', createCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

router.use(logError);

export default router;
