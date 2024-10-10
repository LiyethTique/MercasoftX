import PedidoProducto from '../models/pedidoProducto.js';
import Pedido from '../models/pedidoModel.js';
import Producto from '../models/productoModel.js';
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
            filename: 'logs/pedidoProducto-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Agregar un producto a un pedido con Can_Producto
export const agregarProducto = async (req, res) => {
    const { Id_Pedido, Id_Producto, Can_Producto } = req.body;  // Incluir Can_Producto

    try {
        // Verificar que el pedido y el producto existan
        const pedido = await Pedido.findByPk(Id_Pedido);
        const producto = await Producto.findByPk(Id_Producto);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Crear registro en pedidoProducto con Can_Producto
        const pedidoProducto = await PedidoProducto.create({
            Id_Pedido,
            Id_Producto,
            Can_Producto,  // Añadir Can_Producto
            createdAT: new Date(),
            updatedAT: new Date(),
        });

        res.status(201).json({ message: 'Producto agregado al pedido exitosamente', pedidoProducto });
    } catch (error) {
        logger.error(`Error al agregar producto al pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al agregar producto al pedido', error: error.message });
    }
};

// Obtener un pedidoProducto por Id_PedidoProducto con Can_Producto
export const getPedidoProductoById = async (req, res) => {
    try {
        const pedidoProducto = await PedidoProducto.findByPk(req.params.id, {
            include: [
                {
                    model: Pedido,
                    as: 'pedido', // Alias para Pedido
                },
                {
                    model: Producto,
                    as: 'producto', // Alias para Producto
                }
            ]
        });

        if (pedidoProducto) {
            res.status(200).json(pedidoProducto);
        } else {
            res.status(404).json({ message: 'PedidoProducto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al obtener PedidoProducto: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener PedidoProducto', error: error.message });
    }
};

// Obtener todos los productos en un pedido con Can_Producto
export const getProductosEnPedido = async (req, res) => {
    try {
        const productos = await PedidoProducto.findAll({
            where: { Id_Pedido: req.params.id },
            include: [
                {
                    model: Producto,
                    as: 'producto', // Alias para Producto
                }
            ]
        });

        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: 'No hay productos en este pedido' });
        }
    } catch (error) {
        logger.error(`Error al obtener productos en pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener productos en el pedido', error: error.message });
    }
};

// Eliminar un producto de un pedido
export const eliminarProductoDePedido = async (req, res) => {
    try {
        const deleted = await PedidoProducto.destroy({
            where: { Id_PedidoProducto: req.params.id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Producto eliminado del pedido exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado en el pedido' });
        }
    } catch (error) {
        logger.error(`Error al eliminar producto del pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al eliminar producto del pedido', error: error.message });
    }
};
