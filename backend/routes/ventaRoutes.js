import express from "express";
import { createVenta, deleteVenta, getAllVenta, getVenta, updateVenta} from "../controllers/ventaController.js";
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
            filename: 'logs/venta-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};

router.get('/', getAllVenta);
router.get('/:id', getVenta);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);
// router.use(logError);

export default router;
