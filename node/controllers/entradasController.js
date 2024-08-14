import EntradaModel from "../models/entradaModel.js";
import logger from "../config/logger.js";

// Mostrar todos los registros
export const getAllEntrada = async (req, res, next) => {
    try {
        const entradas = await EntradaModel.findAll();
        logger.info('Todas las entradas recuperadas');
        res.status(200).json(entradas);
    } catch (error) {
        logger.error(`Error al recuperar todas las entradas: ${error.message}`);
        next(error);
    }
};

// Mostrar un registro
export const getEntrada = async (req, res, next) => {
    try {
        const entrada = await EntradaModel.findByPk(req.params.id);
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
