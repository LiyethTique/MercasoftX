const express = require('express');
const winston = require('winston');
const DailyRotatefile = require('winston-daily-rotate-file');


import { createCliente, deleteCliente, getAllClientes, getCliente, getQueryCliente, updateCliente } from "../controllers/clienteController.js";

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d' // Guardar logs por 14 días
        })
    ]
});

// Middleware de logging de errores
const logError = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
};



const router = express.Router()

router.get('/', getAllClientes)
router.get('/:id', getCliente)
router.post('/', createCliente)
router.put('/:id', updateCliente)
router.delete('/:id', deleteCliente)

//FALTAAAAAAAAAAAA consultar por nom_producto
router.get('/Nom_Cliente/:Nom_Cliente', getQueryCliente)

router.use(logError);
module.exports = router;


//export default router