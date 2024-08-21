import EntradaModel from "../models/entradaModel.js";
import logger from "../logs/logger.js";

// Mostrar todos los registros
export const getAllEntradas = async (req, res, next) => {
    try {
        const entradas = await EntradaModel.findAll();
        logger.info('Todas las entradas recuperadas');
        console.log(entradas)
        if(entradas.length > 0) {
            res.status(200).json(entradas);
            return   
        }
        res.status(400).json({ message: "No existen Entradas" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
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

    const { Fec_Entrada, Hor_Entrada, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Fec_Entrada || !Hor_Entrada || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada || !Fec_Vencimiento) {
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

    const { Fec_Entrada, Hor_Entrada, Id_Unidad, Id_Producto, Id_Responsable, Can_Entrada, Fec_Vencimiento } = req.body;

    if (!Fec_Entrada || !Hor_Entrada || !Id_Unidad || !Id_Producto || !Id_Responsable || !Can_Entrada || !Fec_Vencimiento) {
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

export const getQueryEntrada = async (req, res) => {
    try {
        const entrada = await EntradasModel.findAll({
            where: {
                Fec_Entrada: {
                    [Sequelize.Op.like]: `%${req.params.Fec_Entrada}%`
                }
            }
        })
        if(entrada.length > 0){
            res.status(200).json(entrada)
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}