import Pedido from '../models/pedidoModel.js';
import PedidoProducto from '../models/pedidoProducto.js';
import Cliente from '../models/clienteModel.js'; // Asegúrate de que la ruta sea correcta
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
            filename: 'logs/pedido-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Crear un nuevo pedido
export const createPedido = async (req, res) => {
    const { Id_Cliente, Val_Pedido } = req.body;

    try {
        const pedido = await Pedido.create({
            Id_Cliente,
            Fec_Pedido: new Date(),
            Est_Pedido: 'Pendiente',
            Val_Pedido,
            createdAT: new Date(),
            updatedAT: new Date(),
        });
        res.status(201).json({ message: 'Pedido creado exitosamente', pedido });
    } catch (error) {
        logger.error(`Error al crear pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al crear el pedido', error: error.message });
    }
};

// Obtener todos los pedidos
export const getAllPedido = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Cliente, // Incluir datos del cliente
                    as: 'cliente' // Alias para el modelo Cliente
                },
                {
                    model: PedidoProducto, // Incluir productos en el pedido
                    as: 'productos', // Alias para el modelo PedidoProducto
                  
                }
            ]
        });

        if (pedidos.length > 0) {
            res.status(200).json(pedidos);
        } else {
            res.status(404).json({ message: 'No existen pedidos en la base de datos' });
        }
    } catch (error) {
        logger.error(`Error al obtener pedidos: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener los pedidos', error: error.message });
    }
};

// Obtener un pedido por ID
export const getPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [
                {
                    model: Cliente, // Incluir datos del cliente
                    as: 'cliente' // Alias para el modelo Cliente
                },
                {
                    model: PedidoProducto, // Incluir productos en el pedido
                    as: 'productos', // Alias para el modelo PedidoProducto
                  
                }
            ]
        });

        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al obtener pedido por ID: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al obtener el pedido', error: error.message });
    }
};

// Actualizar un pedido por ID
export const updatePedido = async (req, res) => {
    const { Est_Pedido } = req.body; // Solo obtenemos el estado del pedido

    // Validaciones básicas
    if (typeof Est_Pedido === 'undefined') {
        return res.status(400).json({ message: 'El campo Est_Pedido es requerido.' });
    }

    try {
        // Actualizar solo el campo Est_Pedido y updatedAT
        const updated = await Pedido.update(
            { 
                Est_Pedido, 
                updatedAT: new Date() // Actualizamos la fecha de modificación
            },
            { where: { Id_Pedido: req.params.id } }
        );

        // Verificar si la actualización fue exitosa
        if (updated[0]) {
            // Obtener el pedido actualizado con sus relaciones
            const updatedPedido = await Pedido.findByPk(req.params.id, {
                include: [
                    {
                        model: Cliente, // Incluir datos del cliente
                        as: 'cliente' // Alias para el modelo Cliente
                    },
                    {
                        model: PedidoProducto, // Incluir productos en el pedido
                        as: 'productos', // Alias para el modelo PedidoProducto
                    }
                ]
            });
            res.status(200).json({ message: 'Estado del pedido actualizado exitosamente', updatedPedido });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        // Registrar el error y devolver una respuesta de error
        logger.error(`Error al actualizar el estado del pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al actualizar el estado del pedido', error: error.message });
    }
};



// Eliminar un pedido por ID
export const deletePedido = async (req, res) => {
    try {
        const deleted = await Pedido.destroy({
            where: { Id_Pedido: req.params.id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Pedido eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al eliminar pedido: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Error interno al eliminar el pedido', error: error.message });
    }
};
