import Unidad from "../models/unidadModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Area,Responsable } from "../app.js";

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
        const unidades = await Unidad.findAll({
            include: [
                {
                    model: Area,
                    as: 'area'
                },
                {
                    model: Responsable,
                    as: 'responsable'
                }
            ]
            
        });
        if (unidades.length > 0) {
            res.status(200).json(unidades);
            return;
        }
        res.status(200).json([]);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener unidades' });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await Unidad.findByPk(req.params.id,{
            include: [
                {
                    model: Area,
                    as: 'area'
                },
                {
                    model: Responsable,
                    as: 'responsable'
                }
            ]
    });
        if (unidad) {
            res.status(200).json(unidad);
        } else {
            res.status(200).json({ message: 'Unidad no encontrada' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener la unidad' });
    }
};

export const createUnidad = async (req, res) => {
    const { Id_Area, Id_Responsable, Nom_Unidad } = req.body;

    if (!Id_Area || !Id_Responsable || !Nom_Unidad) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const unidad = await Unidad.create(req.body);
        res.status(201).json({ message: 'Unidad creada exitosamente', unidad });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear la unidad' });
    }
};

export const updateUnidad = async (req, res) => {
    const { Id_Area, Id_Responsable, Nom_Unidad } = req.body;

    if (!Id_Area || !Id_Responsable || !Nom_Unidad) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await Unidad.update(req.body, {
            where: { Id_Unidad: req.params.id }
        });
        if (updated) {
            const updatedUnidad = await Unidad.findByPk(req.params.id);
            res.status(200).json({ message: 'Unidad actualizada exitosamente', updatedUnidad });
        } else {
            res.status(404).json({icon: 'warning', message: 'Debe modificar al menos un campo.' });
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

export const getQueryUnidad = async (req, res) => {
    try {
        const unidades = await Unidad.findAll({
            where: {
                Nom_Unidad: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Unidad}%`
                }
            }
        });
        if (unidades.length > 0) {
            res.status(200).json(unidades);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" });
        }
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
};