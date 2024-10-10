import Venta from "../models/ventaModel.js";
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
            filename: 'logs/venta-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

export const getAllVenta = async (req, res) => {
    try {
        const ventas = await Venta.findAll();
        res.status(200).json(ventas);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener ventas' });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id);
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener la venta' });
    }
};

export const createVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido, Id_Producto } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido || !Id_Producto) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const venta = await Venta.create(req.body);
        res.status(201).json({ message: 'Venta creada exitosamente', venta });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear la venta' });
    }
};

export const updateVenta = async (req, res) => {
    const { Fec_Venta, Val_Venta, Tip_Cliente, Id_Pedido, Id_Producto } = req.body;

    if (!Fec_Venta || !Val_Venta || !Tip_Cliente || !Id_Pedido || !Id_Producto) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await Venta.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        if (updated) {
            const updatedVenta = await Venta.findByPk(req.params.id);
            res.status(200).json({ message: 'Venta actualizada exitosamente', updatedVenta });
        } else {
            res.status(404).json({ message: 'Debe modificar al menos un campo.' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar la venta' });
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
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar la venta' });
    }
};
