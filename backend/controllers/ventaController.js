import Venta from "../models/ventaModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Pedido, Producto } from '../app.js';

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

export const getAllVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [
                {
                    model: Pedido,
                    as: 'pedido'
                },
                {
                    model: Producto,
                    as: 'producto'
                }
            ]
        });
        res.status(200).json(ventas.length > 0 ? ventas : []);
    } catch (error) {
        logger.error(`Error al obtener todas las ventas: ${error.message}`);
        res.status(500).json({ message: 'Se produjo un error interno al intentar obtener las ventas. Intente nuevamente más tarde.' });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [
                {
                    model: Pedido,
                    as: 'pedido'
                },
                {
                    model: Producto,
                    as: 'producto'
                }
            ]
        });
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada. Verifique el ID proporcionado.' });
        }
    } catch (error) {
        logger.error(`Error al obtener la venta con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Se produjo un error interno al intentar obtener la venta. Intente nuevamente más tarde.' });
    }
};

export const createVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido) {
        logger.warn('Intento de crear una venta con campos faltantes.');
        return res.status(400).json({ message: 'Los campos Fec_Venta, Val_Venta, Tip_Cliente y Id_Pedido son obligatorios. Asegúrese de que estén completos.' });
    }

    try {
        const venta = await Venta.create(req.body);
        res.status(201).json({ message: 'Venta creada exitosamente', venta });
    } catch (error) {
        logger.error(`Error al crear la venta: ${error.message}`);
        res.status(500).json({ message: 'Se produjo un error interno al intentar crear la venta. Verifique los datos y vuelva a intentarlo.' });
    }
};

export const updateVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido) {
        logger.warn('Intento de actualizar una venta con campos faltantes.');
        return res.status(400).json({ message: 'Los campos Fec_Venta, Val_Venta, Tip_Cliente y Id_Pedido son obligatorios. Asegúrese de que estén completos.' });
    }

    try {
        const [updated] = await Venta.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        if (updated) {
            const updatedVenta = await Venta.findByPk(req.params.id);
            res.status(200).json({ message: 'Venta actualizada exitosamente', updatedVenta });
        } else {
            res.status(404).json({ message: 'Venta no encontrada o no se realizaron cambios. Verifique el ID y los datos enviados.' });
        }
    } catch (error) {
        logger.error(`Error al actualizar la venta con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Se produjo un error interno al intentar actualizar la venta. Verifique los datos y vuelva a intentarlo.' });
    }
};

export const deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.destroy({
            where: { Id_Venta: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Venta eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada. Verifique el ID proporcionado.' });
        }
    } catch (error) {
        logger.error(`Error al eliminar la venta con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Se produjo un error interno al intentar eliminar la venta. Intente nuevamente más tarde.' });
    }
};
