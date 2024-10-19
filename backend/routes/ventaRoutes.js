import express from "express";
import { 
    createVenta, 
    deleteVenta, 
    getAllVentas, 
    getVenta, 
    updateVenta 
} from "../controllers/ventaController.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const router = express.Router();

// Configuración de Winston con archivos rotativos
const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => 
            `${info.timestamp}: ${info.level}: ${info.message}`
        )
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/venta-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Middleware para manejar errores globalmente
const logError = (err, req, res, next) => {
    logger.error(
        `[${req.method}] ${req.originalUrl} - Params: ${JSON.stringify(req.params)} - ` +
        `Body: ${JSON.stringify(req.body)} - Error: ${err.message}`
    );
    res.status(500).json({
        error: 'Se produjo un error interno. Por favor, intente nuevamente más tarde.'
    });
};

// Middleware para capturar errores en funciones async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Rutas con manejo de errores usando asyncHandler
router.get('/', asyncHandler(getAllVentas));
router.get('/:id', asyncHandler(getVenta));
router.post('/', asyncHandler(createVenta));
router.put('/:id', asyncHandler(updateVenta));
router.delete('/:id', asyncHandler(deleteVenta));

// Uso del middleware de errores
router.use(logError);

export default router;