import Entrada from '../models/entradaModel.js';
import Unidad from '../models/unidadModel.js';
import Producto from '../models/productoModel.js';
import Responsable from '../models/responsableModel.js';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

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

export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await Entrada.findAll({
            include: [
                { model: Unidad, attributes: ['Id_Unidad'] },
                { model: Producto, attributes: ['Nom_Producto'] },
                { model: Responsable, attributes: ['Nom_Responsable'] }
            ]
        });
        res.status(200).json(entradas);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener entradas' });
    }
};

export const getEntrada = async (req, res) => {
    try {
        const entrada = await Entrada.findByPk(req.params.id, {
            include: [
                { model: Unidad, attributes: ['Id_Unidad'] },
                { model: Producto, attributes: ['Nom_Producto'] },
                { model: Responsable, attributes: ['Nom_Responsable'] }
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

export const createEntrada = async (req, res) => {
    const { Fec_Entrada, Hor_Entrada, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Fec_Entrada || !Hor_Entrada || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada) {
        logger.warn('Todos los campos obligatorios no fueron proporcionados');
        return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    try {
        const entrada = await Entrada.create({
            Fec_Entrada,
            Hor_Entrada,
            Id_Unidad,
            Id_Producto,
            Id_Responsable,
            Can_Entrada,
            Fec_Vencimiento
        });
        res.status(201).json({ message: 'Entrada creada exitosamente', entrada });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear la entrada' });
    }
};

export const updateEntrada = async (req, res) => {
    const { Fec_Entrada, Hor_Entrada, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Fec_Entrada || !Hor_Entrada || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada) {
        logger.warn('Todos los campos obligatorios no fueron proporcionados');
        return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    try {
        const [updated] = await Entrada.update(req.body, {
            where: { Id_Entrada: req.params.id }
        });
        if (updated) {
            const updatedEntrada = await Entrada.findByPk(req.params.id);
            res.status(200).json({ message: 'Entrada actualizada exitosamente', updatedEntrada });
        } else {
            res.status(404).json({ message: 'Debe modificar al menos un campo' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar la entrada' });
    }
};

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
