import Unidad from "../models/unidadModel.js";
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
            filename: 'logs/unidad-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

export const getAllUnidades = async (req, res) => {
    try {
        const unidades = await Unidad.findAll();
        res.status(200).json(unidades);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener unidades' });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await Unidad.findByPk(req.params.id);
        if (unidad) {
            res.status(200).json(unidad);
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener la unidad' });
    }
};

export const createUnidad = async (req, res) => {
    try {
        const unidad = await Unidad.create(req.body);
        res.status(201).json({ message: 'Unidad creada exitosamente', unidad });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear la unidad' });
    }
};

export const updateUnidad = async (req, res) => {
    try {
        const [updated] = await Unidad.update(req.body, {
            where: { Id_Unidad: req.params.id }
        });
        if (updated) {
            const updatedUnidad = await Unidad.findByPk(req.params.id);
            res.status(200).json({ message: 'Unidad actualizada exitosamente', updatedUnidad });
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar la unidad' });
    }
};

export const deleteUnidad = async (req, res) => {
    try {
        const deleted = await Unidad.destroy({
            where: { Id_Unidad: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Unidad eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar la unidad' });
    }
};