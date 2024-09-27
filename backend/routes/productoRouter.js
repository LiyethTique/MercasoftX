import express from "express";
import { createProducto, deleteProducto, getAllProducto, getProducto, updateProducto, getQueryProducto } from "../controllers/productoController.js";
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

router.get('/', getAllProducto);
router.get('/:id', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
router.get('/Nom_Responsable/:Nom_Responsable', getQueryProducto);

export default router;
