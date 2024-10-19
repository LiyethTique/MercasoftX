import Venta from "../models/ventaModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Pedido, Producto } from '../app.js';

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/venta-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        }),
        new winston.transports.Console()
    ]
});

// Utilidad para formatear errores y registros
const logAndRespond = (error, message, req, res, statusCode = 500) => {
    const logMessage = `${req.method} ${req.originalUrl} - ${message}: ${error.message}`;
    logger.error(logMessage);
    res.status(statusCode).json({ message });
};

// Obtener todas las ventas
export const getAllVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [
                { model: Pedido, as: 'pedido' },
                { model: Producto, as: 'producto' }
            ]
        });
        res.status(200).json(ventas.length > 0 ? ventas : []);
    } catch (error) {
        logAndRespond(
            error,
            'Error al obtener todas las ventas',
            req,
            res
        );
    }
};

// Obtener una venta por ID
export const getVenta = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [
                { model: Pedido, as: 'pedido' },
                { model: Producto, as: 'producto' }
            ]
        });
        if (venta) {
            res.status(200).json(venta);
        } else {
            logger.warn(`GET /venta/${req.params.id} - Venta no encontrada.`);
            res.status(404).json({ message: 'Venta no encontrada. Verifique el ID proporcionado.' });
        }
    } catch (error) {
        logAndRespond(
            error,
            `Error al obtener la venta con ID ${req.params.id}`,
            req,
            res
        );
    }
};

// Crear una nueva venta
export const createVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido) {
        logger.warn(`POST /venta - Intento de crear una venta con campos faltantes.`);
        return res.status(400).json({
            message: 'Los campos Fec_Venta, Val_Venta, Tip_Cliente y Id_Pedido son obligatorios.'
        });
    }

    try {
        const venta = await Venta.create(req.body);
        res.status(201).json({ message: 'Venta creada exitosamente', venta });
    } catch (error) {
        logAndRespond(
            error,
            'Error al crear la venta',
            req,
            res
        );
    }
};

// Actualizar una venta
export const updateVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido) {
        logger.warn(`PUT /venta/${req.params.id} - Intento de actualizar una venta con campos faltantes.`);
        return res.status(400).json({
            message: 'Los campos Fec_Venta, Val_Venta, Tip_Cliente y Id_Pedido son obligatorios.'
        });
    }

    try {
        const [updated] = await Venta.update(req.body, {
            where: { Id_Venta: req.params.id }
        });

        if (updated) {
            const updatedVenta = await Venta.findByPk(req.params.id);
            res.status(200).json({ message: 'Venta actualizada exitosamente', updatedVenta });
        } else {
            logger.warn(`PUT /venta/${req.params.id} - Venta no encontrada o sin cambios.`);
            res.status(404).json({
                message: 'Venta no encontrada o no se realizaron cambios. Verifique el ID y los datos enviados.'
            });
        }
    } catch (error) {
        logAndRespond(
            error,
            `Error al actualizar la venta con ID ${req.params.id}`,
            req,
            res
        );
    }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.destroy({
            where: { Id_Venta: req.params.id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Venta eliminada exitosamente' });
        } else {
            logger.warn(`DELETE /venta/${req.params.id} - Venta no encontrada.`);
            res.status(404).json({ message: 'Venta no encontrada. Verifique el ID proporcionado.' });
        }
    } catch (error) {
        logAndRespond(
            error,
            `Error al eliminar la venta con ID ${req.params.id}`,
            req,
            res
        );
    }
};