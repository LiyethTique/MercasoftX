import express from 'express';
import {
    createUnidad,
    updateUnidad,
    getAllUnidades,
    getUnidad,
    deleteUnidad,
    getQueryUnidad
} from '../controllers/unidadController.js';
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
            filename: 'logs/unidad-%DATE%.log',
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

// Rutas para el controlador de Unidad
router.get('/', getAllUnidades);
router.get('/:id', getUnidad);
router.post('/', createUnidad);
router.put('/:id', updateUnidad);
router.delete('/:id', deleteUnidad);
router.get('/Nom_Unidad/:Nom_Unidad', getQueryUnidad);

export default router;