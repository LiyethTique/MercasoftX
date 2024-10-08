import Entrada from "../models/entradaModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Unidad, Producto, Responsable } from '../app.js'; // Asegúrate de que estos modelos existan

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(info => `${info.timestamp}: ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/entrada-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

// Obtener todas las entradas
export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await Entrada.findAll({
            include: [
                {
                    model: Unidad,
                    as: 'unidad'
                },
                {
                    model: Producto,
                    as: 'producto'
                },
                {
                    model: Responsable,
                    as: 'responsable'
                }
            ]
        });
        res.status(200).json(entradas.length > 0 ? entradas : []);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener entradas' });
    }
};

// Obtener una sola entrada por ID
export const getEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findByPk(req.params.id, {
            include: [
                {
                    model: Unidad,
                    as: 'unidad'
                },
                {
                    model: Producto,
                    as: 'producto'
                },
                {
                    model: Responsable,
                    as: 'responsable'
                }
            ]
        });
        if (entrada) {
            res.status(200).json(entrada);
        } else {
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener la entrada' });
    }
};

// Crear una nueva entrada
export const createEntrada = async (req, res) => {
    const { Dcp_Entrada, Fec_Entrada, Ori_Entrada, Des_Entrada, Val_Unitario, Val_Total, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Dcp_Entrada || !Fec_Entrada || !Ori_Entrada || !Des_Entrada || !Val_Unitario || !Val_Total || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const entrada = await Entrada.create(req.body);
        res.status(201).json({ message: 'Entrada creada exitosamente', entrada });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear la entrada' });
    }
};

// Actualizar una entrada existente
export const updateEntrada = async (req, res) => {
    const { Dcp_Entrada, Fec_Entrada, Ori_Entrada, Des_Entrada, Val_Unitario, Val_Total, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Dcp_Entrada || !Fec_Entrada || !Ori_Entrada || !Des_Entrada || !Val_Unitario || !Val_Total || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await Entrada.update(req.body, {
            where: { Id_Entrada: req.params.id }
        });
        if (updated) {
            const updatedEntrada = await Entrada.findByPk(req.params.id);
            res.status(200).json({ message: 'Entrada actualizada exitosamente', updatedEntrada });
        } else {
            res.status(404).json({ message: 'Debe modificar al menos un campo.' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar la entrada' });
    }
};

// Eliminar una entrada
export const deleteEntrada = async (req, res) => {
    try {
        const deleted = await Entrada.destroy({
            where: { Id_Entrada: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Entrada eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar la entrada' });
    }
};