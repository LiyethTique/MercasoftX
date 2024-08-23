import express from "express";
import { createTraslado, deleteTraslado, getAllTraslados, getTraslado, updateTraslado } from "../controllers/trasladoController.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const routerTraslados = express.Router();

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
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

const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

routerTraslados.get('/', getAllTraslados);
routerTraslados.get('/:id', getTraslado);
routerTraslados.post('/', createTraslado);
routerTraslados.put('/:id', updateTraslado);
routerTraslados.delete('/:id', deleteTraslado);

routerTraslados.use(logError);

export default routerTraslados;
