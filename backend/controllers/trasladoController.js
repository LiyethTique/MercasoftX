import Traslado from "../models/trasladoModel.js";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Sequelize } from "sequelize";

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
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener los traslados' });
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
    const { Fec_Traslado, Dcp_Traslado, Ori_Traslado, Des_Traslado, Uni_DeMedida, Id_Producto, Can_Producto, Val_Unitario, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Dcp_Traslado || !Ori_Traslado || !Des_Traslado || !Uni_DeMedida || !Id_Producto || !Can_Producto || !Val_Unitario || !Id_Responsable) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const traslado = await Traslado.create(req.body);
        res.status(201).json({ message: 'Traslado creado exitosamente', traslado });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear el traslado' });
    }
};

export const updateTraslado = async (req, res) => {
    const { Fec_Traslado, Dcp_Traslado, Ori_Traslado, Des_Traslado, Uni_DeMedida, Id_Producto, Can_Producto, Val_Unitario, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Dcp_Traslado || !Ori_Traslado || !Des_Traslado || !Uni_DeMedida || !Id_Producto || !Can_Producto || !Val_Unitario || !Id_Responsable) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await Traslado.update(req.body, {
            where: { Id_Traslado: req.params.id }
        });
        if (updated) {
            const updatedTraslado = await Traslado.findByPk(req.params.id);
            res.status(200).json({ message: 'Traslado actualizado exitosamente', updatedTraslado });
        } else {
            res.status(404).json({ message: 'Debe modificar al menos un campo.' });
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

export const getQueryTraslado = async (req, res) => {
    try {
        const traslados = await Traslado.findAll({
            where: {
                Dcp_Traslado: {
                    [Sequelize.Op.like]: `%${req.params.Dcp_Traslado}%`
                }
            }
        });
        if (traslados.length > 0) {
            res.status(200).json(traslados);
        } else {
            res.status(404).json({ message: 'No se encontraron registros para la descripción especificada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
