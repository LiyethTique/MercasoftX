import express from "express";
import {
    createCarrito,
    deleteCarrito,
    getAllCarrito,
    getCarrito,
    updateCarrito
} from "../controllers/carritoController.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const router = express.Router();

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/carrito-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Rutas para el modelo Carrito
router.get('/', getAllCarrito);
router.get('/:id', getCarrito);
router.post('/', createCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);

router.use(logError);

export default router;
