import EntradaModel from "../models/entradaModel.js";
import logger from "../logs/logger.js";
import { Sequelize } from "sequelize";
import { Responsable, Producto, Unidad } from '../app.js';

// Mostrar todos los registros
export const getAllEntradas = async (req, res, next) => {
    try {
        const entradas = await EntradaModel.findAll({
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

        logger.info('Todas las entradas recuperadas');
        console.log(entradas);

        // Returning an empty array if no entries are found
        res.status(200).json(entradas.length > 0 ? entradas : []);
    } catch (error) {
        console.error(error); // Use console.error for errors
        res.status(500).json({ message: error.message });
        logger.error(`Error al recuperar todas las entradas: ${error.message}`);
        next(error);
    }
};


// Mostrar un registro
export const getEntrada = async (req, res, next) => {
    try {
        const entrada = await EntradaModel.findByPk(req.params.id, {
            include: [
                {
                    model: Unidad,
                    as: 'unidad'
                }
            ],
            include: [
                {
                    model: Producto,
                    as: 'producto'
                }
            ],
            include: [
                {
                    model: Responsable,
                    as: 'responsable'
                }
            ]

        });
        if (entrada) {
            logger.info(`Entrada recuperada: ${entrada.Id_Entrada}`);
            res.status(200).json(entrada);
        } else {
            logger.warn(`Entrada no encontrada con id: ${req.params.id}`);
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al recuperar la entrada: ${error.message}`);
        next(error);
    }
};

// Crear una entrada
export const createEntrada = async (req, res, next) => {

    const { Dcp_Entrada, Fec_Entrada, Ori_Entrada, Des_Entrada, Val_Unitario, Val_Total, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Dcp_Entrada || !Fec_Entrada || !Ori_Entrada || !Des_Entrada || !Val_Unitario || !Val_Total || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada || !Fec_Vencimiento) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaEntrada = await EntradaModel.create(req.body);
        logger.info(`Entrada creada: ${nuevaEntrada.Id_Entrada}`);
        res.status(201).json({ message: '¡Entrada creada exitosamente!', entrada: nuevaEntrada });
    } catch (error) {
        logger.error(`Error al crear la entrada: ${error.message}`);
        next(error);
    }
};

// Actualizar un registro
export const updateEntrada = async (req, res, next) => {

    const { Dcp_Entrada, Fec_Entrada, Ori_Entrada, Des_Entrada, Val_Unitario, Val_Total, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Dcp_Entrada || !Fec_Entrada || !Ori_Entrada || !Des_Entrada || !Val_Unitario || !Val_Total || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada || !Fec_Vencimiento) {
        logger.warn('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [updated] = await EntradaModel.update(req.body, {
            where: { Id_Entrada: req.params.id }
        });
        if (updated) {
            logger.info(`Entrada actualizada: ${req.params.id}`);
            res.status(200).json({ message: '¡Entrada actualizada exitosamente!' });
        } else {
            logger.warn(`Entrada no encontrada con id: ${req.params.id}`);
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al actualizar la entrada: ${error.message}`);
        next(error);
    }
};

// Borrar un registro
export const deleteEntrada = async (req, res, next) => {
    try {
        const deleted = await EntradaModel.destroy({
            where: { Id_Entrada: req.params.id }
        });
        if (deleted) {
            logger.info(`Entrada borrada: ${req.params.id}`);
            res.status(200).json({ message: '¡Entrada borrada exitosamente!' });
        } else {
            logger.warn(`Entrada no encontrada con id: ${req.params.id}`);
            res.status(404).json({ message: 'Entrada no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al borrar la entrada: ${error.message}`);
        next(error);
    }
};

// Consultar por fecha
export const getQueryEntrada = async (req, res) => {
    try {
        const entradas = await EntradaModel.findAll({
            where: {
                Fec_Entrada: {
                    [Sequelize.Op.like]: `%${req.params.Fec_Entrada}%`
                }
            }
        });
        if (entradas.length > 0) {
            res.status(200).json(entradas);
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
