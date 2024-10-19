import Unidad from "../models/unidadModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Area, Responsable } from "../app.js";
import Sequelize from "sequelize";

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
        res.status(200).json([]); // Retornar un array vacío si no hay unidades
    } catch (error) {
        logger.error(`Error al obtener unidades: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar obtener las unidades. Por favor, inténtelo más tarde.' });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await Unidad.findByPk(req.params.id, {
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
            res.status(404).json({ message: 'Unidad no encontrada. Verifique que el ID proporcionado sea correcto.' });
        }
    } catch (error) {
        logger.error(`Error al obtener la unidad con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar obtener la unidad. Por favor, inténtelo más tarde.' });
    }
};

export const createUnidad = async (req, res) => {
    const { Id_Area, Id_Responsable, Nom_Unidad } = req.body;

    if (!Id_Area || !Id_Responsable || !Nom_Unidad) {
        logger.warn('Intento de crear unidad fallido: todos los campos son obligatorios.');
        return res.status(400).json({ message: 'Todos los campos son obligatorios. Por favor, complete toda la información necesaria.' });
    }

    try {
        const unidad = await Unidad.create(req.body);
        res.status(201).json({ message: 'Unidad creada exitosamente', unidad });
    } catch (error) {
        logger.error(`Error al crear unidad: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar crear la unidad. Por favor, inténtelo más tarde.' });
    }
};

export const updateUnidad = async (req, res) => {
    const { Id_Area, Id_Responsable, Nom_Unidad } = req.body;

    if (!Id_Area || !Id_Responsable || !Nom_Unidad) {
        logger.warn('Intento de actualizar unidad fallido: todos los campos son obligatorios.');
        return res.status(400).json({ message: 'Todos los campos son obligatorios. Por favor, complete toda la información necesaria.' });
    }

    try {
        const [updated] = await Unidad.update(req.body, {
            where: { Id_Unidad: req.params.id }
        });
        if (updated) {
            const updatedUnidad = await Unidad.findByPk(req.params.id);
            res.status(200).json({ message: 'Unidad actualizada exitosamente', updatedUnidad });
        } else {
            res.status(404).json({ message: 'Unidad no encontrada o no se modificó ningún campo. Verifique que el ID sea correcto.' });
        }
    } catch (error) {
        logger.error(`Error al actualizar la unidad con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar actualizar la unidad. Por favor, inténtelo más tarde.' });
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
            res.status(404).json({ message: 'Unidad no encontrada. Verifique que el ID proporcionado sea correcto.' });
        }
    } catch (error) {
        logger.error(`Error al eliminar la unidad con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar eliminar la unidad. Por favor, inténtelo más tarde.' });
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
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado. Por favor, intente con otro criterio." });
        }
    } catch (error) {
        logger.error(`Error al realizar la consulta de unidades: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al intentar realizar la consulta. Por favor, inténtelo más tarde.' });
    }
};
