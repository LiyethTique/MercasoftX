import express from 'express';
import { createTraslado, updateTraslado, getAllTraslados, getTraslado, deleteTraslado, getQueryTraslado } from '../controllers/trasladoController.js';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const router = express.Router();

// Configuración de Winston Logger para manejar errores
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/traslado-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Middleware para manejar errores y registrar logs
const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Definición de las rutas para el CRUD de Traslados
router.get('/', getAllTraslados);
router.get('/:id', getTraslado);
router.post('/', createTraslado);
router.put('/:id', updateTraslado);
router.delete('/:id', deleteTraslado);
router.get('/Dcp_Traslado/:Dcp_Traslado', getQueryTraslado);

// Middleware de manejo de errores
router.use(logError);

export default router;
