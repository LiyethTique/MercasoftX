import express from "express";
import { uploadImage, deleteProducto, getAllProducto, getProducto, updateProducto, upload } from "../controllers/productoController.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const router = express.Router();

// Configuración de logger con Winston
const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/producto-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Middleware para registrar errores
const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Rutas
router.post('/', upload.single('Ima_Producto'), uploadImage);  // Subir imagen y crear producto
router.get('/', getAllProducto);  // Obtener todos los productos
router.get('/:id', getProducto);  // Obtener un producto por su ID
router.put('/:id', upload.single('Ima_Producto'), updateProducto);  // Actualizar un producto
router.delete('/:id', deleteProducto);  // Eliminar un producto

// Middleware para manejar errores en la ruta
router.use(logError);

export default router;