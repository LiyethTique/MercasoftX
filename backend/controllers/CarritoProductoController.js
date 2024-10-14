import CarritoProducto from '../models/carritoproductoModel.js';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Configuración de logger con winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/carritoProducto-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
    const { Id_Carrito, Id_Producto, Can_Producto } = req.body;

    try {
        const carritoProducto = await CarritoProducto.create({
            Id_Carrito,
            Id_Producto,
            Can_Producto,
            createdAT: new Date(),
            updatedAT: new Date(),
        });
        res.status(201).json({ message: 'Producto agregado al carrito exitosamente', carritoProducto });
    } catch (error) {
        logger.error(`Error al agregar producto al carrito: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al agregar producto al carrito', error: error.message });
    }
};

// Obtener todos los productos en el carrito
export const getProductosEnCarrito = async (req, res) => {
    try {
        const productos = await CarritoProducto.findAll({ where: { Id_Carrito: req.params.id } });
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No hay productos en el carrito' });
        }
    } catch (error) {
        logger.error(`Error al obtener productos en carrito: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener productos en el carrito', error: error.message });
    }
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const deleted = await CarritoProducto.destroy({
            where: { Id_CarritoProducto: req.params.id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        logger.error(`Error al eliminar producto del carrito: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al eliminar producto del carrito', error: error.message });
    }
};
