import express from 'express';
import { createArea, updateArea, getAllAreas, getArea, deleteArea, getQueryArea } from '../controllers/areaController.js';
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
            filename: 'logs/area-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Rutas para áreas
router.get('/', getAllAreas);
router.get('/:id', getArea);
router.post('/', createArea);
router.put('/:id', updateArea);
router.delete('/:id', deleteArea);
router.get('/Nom_Area/:Nom_Area', getQueryArea);

// Manejo de errores
router.use(logError);

export default router;
