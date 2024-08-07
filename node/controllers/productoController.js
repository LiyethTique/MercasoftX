import Producto from "../models/productoModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

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

export const getAllProducto = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

export const getProducto = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

export const createProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json({ message: 'Producto creado exitosamente', producto });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const [updated] = await Producto.update(req.body, {
            where: { Id_Producto: req.params.id }
        });
        if (updated) {
            const updatedProducto = await Producto.findByPk(req.params.id);
            res.status(200).json({ message: 'Producto actualizado exitosamente', updatedProducto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const deleted = await Producto.destroy({
            where: { Id_Producto: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};
