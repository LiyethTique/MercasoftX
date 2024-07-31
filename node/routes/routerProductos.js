const express = require('express');
const winston = require('winston');
const DailyRotatefile = require('winston-daily-rotate-file');

import { createProducto, deleteProducto, getAllProductos, getProducto, getQueryProducto, updateProducto } from "../controllers/productoController.js";
//nuevo
import multer from 'multer'
import path from 'path'
import { Module } from "vm";

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

//nuevo
const storage = multer.diskStorage({
	destination: (req,file,cb) =>{
		cb(null,'public/uploads/')

	},
	filename: (req,file,cb) => {
		cb(null,Date.now() + path.extname(file.originalname))
		
	}
})
const upload = multer ({storage})


router.get('/', getAllProductos)
router.get('/:id', getProducto)
router.post('/', upload.single('Ima_Producto'), createProducto)
router.put('/:id', upload.single('Ima_Producto'), updateProducto)
router.delete('/:id', deleteProducto)

//consultar por nom_producto
router.get('/Nom_Producto/:Nom_Producto', getQueryProducto)

router.use(logError);
module.exports = router;

//export default router
