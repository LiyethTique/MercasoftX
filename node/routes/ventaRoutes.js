import express from "express";
import { createVenta, deleteVenta, getAllVenta, getVenta, updateVenta, getQueryVenta } from "../controllers/ventaController.js";

const router = express.Router()
//Middleware de logging
const logError = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    res.status(500).json({error: `Internal Server error`});
};

//define tus rutas



//ruta raíz http://localhost:8000/venta/
router.get('/', getAllVenta)    
router.get('/:id', getVenta)
router.post('/', createVenta)
router.put('/:id', updateVenta)
router.delete('/:id', deleteVenta)

router.get('/consulta/:id', getQueryVenta)

router.use(logError);
export default router