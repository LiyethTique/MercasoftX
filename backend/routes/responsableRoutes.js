import express from 'express';
import { createResponsable, updateResponsable, getAllResponsables, getResponsable, deleteResponsable } from '../controllers/responsableController.js';
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
            filename: 'logs/producto-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

router.get('/', getAllResponsables);
router.get('/:id', getResponsable);
router.post('/', createResponsable);
router.put('/:id', updateResponsable);
router.delete('/:id', deleteResponsable);

export default router;