import Responsable from "../models/responsableModel.js";
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
            filename: 'logs/responsable-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d'
        })
    ]
});

export const getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.findAll();
        if (responsables.length > 0) {
            res.status(200).json(responsables);
            return
        }
        res.status(400).json({ message: 'No existen Responsables'});
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener responsables' });
    }
};

export const getResponsable = async (req, res) => {
    try {
        const responsable = await Responsable.findByPk(req.params.id);
        if (responsable) {
            res.status(200).json(responsable);
        } else {
            res.status(404).json({ message: 'Responsable no encontrado' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al obtener el responsable' });
    }
};

export const createResponsable = async (req, res) => {

    const { Nom_Responsable, Tel_Responsable, Tip_Responsable, Tip_Genero } = req.body;

    if (!Nom_Responsable || !Tel_Responsable || !Tip_Responsable || !Tip_Genero) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const responsable = await Responsable.create(req.body);
        res.status(201).json({ message: 'Responsable creado exitosamente', responsable });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al crear el responsable' });
    }
};

export const updateResponsable = async (req, res) => {

    const { Nom_Responsable, Tel_Responsable, Tip_Responsable, Tip_Genero } = req.body;

    if (!Nom_Responsable || !Tel_Responsable || !Tip_Responsable || !Tip_Genero) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    try {
        const [updated] = await Responsable.update(req.body, {
            where: { Id_Responsable: req.params.id }
        });
        if (updated) {
            const updatedResponsable = await Responsable.findByPk(req.params.id);
            res.status(200).json({ message: 'Responsable actualizado exitosamente', updatedResponsable });
        } else {
            res.status(404).json({ icon: 'warning', message: 'Debe Modificar al menos un campo.' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al actualizar el responsable' });
    }
};

export const deleteResponsable = async (req, res) => {
    const { id } = req.params; // Captura el ID desde los parámetros
    if (!id) {
        return res.status(400).json({ message: 'ID de responsable es requerido.' });
    }

    try {
        // Verifica si el responsable existe antes de intentar eliminarlo
        const responsable = await Responsable.findByPk(id);
        if (!responsable) {
            return res.status(404).json({ message: 'Responsable no encontrado' });
        }

        const deleted = await Responsable.destroy({
            where: { Id_Responsable: id }
        });

        if (deleted) {
            res.status(200).json({ message: 'Responsable eliminado exitosamente' });
        } else {
            res.status(500).json({ message: 'Error al eliminar el responsable' });
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'Error al eliminar el responsable' });
    }
};
