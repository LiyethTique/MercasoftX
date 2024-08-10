import Traslado from "../models/trasladosModel.js";
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
            filename: 'logs/traslado-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await Traslado.findAll();
        if (traslados.length > 0) {
            res.status(200).json(traslados);
            return
        }
        res.status(400).json({ message: 'No hay traslados' });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener traslados' });
    }
};

export const getTraslado = async (req, res) => {
    try {
        const traslado = await Traslado.findByPk(req.params.id);
        if (traslado) {
            res.status(200).json(traslado);
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener el traslado' });
    }
};

export const createTraslado = async (req, res) => {
    try {
        const traslado = await Traslado.create(req.body);
        res.status(201).json({ message: 'Traslado creado exitosamente', traslado });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear el traslado' });
    }
};

export const updateTraslado = async (req, res) => {
    try {
        const [updated] = await Traslado.update(req.body, {
            where: { Id_Traslado: req.params.id }
        });
        if (updated) {
            const updatedTraslado = await Traslado.findByPk(req.params.id);
            res.status(200).json({ message: 'Traslado actualizado exitosamente', updatedTraslado });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar el traslado' });
    }
};

export const deleteTraslado = async (req, res) => {
    try {
        const deleted = await Traslado.destroy({
            where: { Id_Traslado: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Traslado eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar el traslado' });
    }
};
