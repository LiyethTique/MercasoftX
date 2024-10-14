// controllers/trasladoController.js
import Traslado from "../models/trasladoModel.js";
import Responsable from "../models/responsableModel.js";
import Producto from "../models/productoModel.js"; // Importación correcta
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import Sequelize from 'sequelize';

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
        res.status(200).json(traslados.length > 0 ? traslados : []);
    } catch (error) {
        logger.error(`Error al obtener traslados: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudieron obtener los traslados.' });
    }
};

export const getTraslado = async (req, res) => {
    try {
        const traslado = await Traslado.findByPk(req.params.id);
        if (!traslado) {
            logger.warn(`Traslado no encontrado con ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Traslado no encontrado' });
        }
        res.status(200).json(traslado);
    } catch (error) {
        logger.error(`Error al obtener el traslado con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudo obtener el traslado.' });
    }
};

export const createTraslado = async (req, res) => {
    const { Fec_Traslado, Dcp_Traslado, Ori_Traslado, Des_Traslado, Uni_DeMedida, Id_Producto, Can_Producto, Val_Unitario, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Dcp_Traslado || !Ori_Traslado || !Des_Traslado || !Uni_DeMedida || !Id_Producto || !Can_Producto || !Val_Unitario || !Id_Responsable) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el producto existe
        const producto = await Producto.findByPk(Id_Producto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const traslado = await Traslado.create(req.body);
        res.status(201).json({ message: 'Traslado creado exitosamente', traslado });
    } catch (error) {
        logger.error(`Error al crear traslado: ${error.message}`); // Mejora en la descripción del error
        res.status(500).json({ message: 'Error interno del servidor: No se pudo crear el traslado.', error: error.message }); // Añadir detalles sobre el error
    }
};


export const updateTraslado = async (req, res) => {
    const { Fec_Traslado, Dcp_Traslado, Ori_Traslado, Des_Traslado, Uni_DeMedida, Id_Producto, Can_Producto, Val_Unitario, Id_Responsable } = req.body;

    if (!Fec_Traslado || !Dcp_Traslado || !Ori_Traslado || !Des_Traslado || !Uni_DeMedida || !Id_Producto || !Can_Producto || !Val_Unitario || !Id_Responsable) {
        logger.warn('Error de validación: Todos los campos son obligatorios');
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
            logger.warn(`No se encontró el traslado para actualizar con ID: ${req.params.id}`);
            res.status(404).json({ message: 'No se encontró el traslado para actualizar.' });
        }
    } catch (error) {
        logger.error(`Error al actualizar el traslado con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudo actualizar el traslado.' });
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
            logger.warn(`No se encontró el traslado para eliminar con ID: ${req.params.id}`);
            res.status(404).json({ message: 'Traslado no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al eliminar el traslado con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudo eliminar el traslado.' });
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
            logger.warn(`No se encontraron registros para la descripción: ${req.params.Dcp_Traslado}`);
            res.status(404).json({ message: 'No se encontraron registros para la descripción especificada' });
        }
    } catch (error) {
        logger.error(`Error al realizar la consulta de traslados: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudo realizar la consulta.' });
    }
};

// Ejemplo de uso del modelo Responsable
export const getAllResponsables = async (req, res) => {
    try {
        const responsables = await Responsable.findAll();
        res.status(200).json(responsables);
    } catch (error) {
        logger.error(`Error al obtener responsables: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor: No se pudieron obtener los responsables.' });
    }
};
