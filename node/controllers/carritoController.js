import CarritoModel from "../models/carritoModel.js";
import logger from "../logs/logger.js";

// Mostrar todos los registros
export const getAllCarrito = async (req, res, next) => {
    try {
        const carritos = await CarritoModel.findAll();
        logger.info('Todos los carritos recuperados');
        res.status(200).json(carritos);
    } catch (error) {
        logger.error(`Error al recuperar todos los carritos: ${error.message}`);
        next(error);
    }
};

// Mostrar un registro
export const getCarrito = async (req, res, next) => {
    try {
        const carrito = await CarritoModel.findByPk(req.params.id);
        if (carrito) {
            logger.info(`Carrito recuperado: ${carrito.Id_Carrito}`);
            res.status(200).json(carrito);
        } else {
            logger.warn(`Carrito no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al recuperar el carrito: ${error.message}`);
        next(error);
    }
};

// Crear un carrito
export const createCarrito = async (req, res, next) => {

    const { Can_Producto } = req.body;

    if (!Can_Producto) {
        logger.warn('El campo Can_Producto es obligatorio');
        return res.status(400).json({ message: 'El campo Can_Producto es obligatorio' });
    }


    try {
        const nuevoCarrito = await CarritoModel.create(req.body);
        logger.info(`Carrito creado: ${nuevoCarrito.Id_Carrito}`);
        res.status(201).json({ message: '¡Carrito creado exitosamente!', carrito: nuevoCarrito });
    } catch (error) {
        logger.error(`Error al crear el carrito: ${error.message}`);
        next(error);
    }
};

// Actualizar un registro
export const updateCarrito = async (req, res, next) => {

    const { Can_Producto } = req.body;

    if (!Can_Producto) {
        logger.warn('El campo Can_Producto es obligatorio');
        return res.status(400).json({ message: 'El campo Can_Producto es obligatorio' });
    }

    try {
        const [updated] = await CarritoModel.update(req.body, {
            where: { Id_Carrito: req.params.id }
        });
        if (updated) {
            logger.info(`Carrito actualizado: ${req.params.id}`);
            res.status(200).json({ message: '¡Carrito actualizado exitosamente!' });
        } else {
            logger.warn(`Carrito no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al actualizar el carrito: ${error.message}`);
        next(error);
    }
};

// Borrar un registro
export const deleteCarrito = async (req, res, next) => {
    try {
        const deleted = await CarritoModel.destroy({
            where: { Id_Carrito: req.params.id }
        });
        if (deleted) {
            logger.info(`Carrito borrado: ${req.params.id}`);
            res.status(200).json({ message: '¡Carrito borrado exitosamente!' });
        } else {
            logger.warn(`Carrito no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al borrar el carrito: ${error.message}`);
        next(error);
    }
};

<<<<<<< HEAD
=======

>>>>>>> main
export const getQueryCarrito = async (req, res) => {
    try {
        const carrito = await CarritosModel.findAll({
            where: {
                Id_Carrito: {
                    [Sequelize.Op.like]: `%${req.params.Id_carrito}%`
                }
            }
        })
        if(carrito.length > 0){
            res.status(200).json(carrito)
        } else {
            res.status(404).json({ message: "No se encontraron registros para la Id especificada" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}