import CarritoProductoModel from "../models/carritoproductoModel.js";
import logger from "../logs/logger.js";

// Mostrar todos los registros
export const getAllCarritoProducto = async (req, res, next) => {
    try {
        const carritoProductos = await CarritoProductoModel.findAll();
        logger.info('Todos los registros de carrito-producto recuperados');
        res.status(200).json(carritoProductos);
    } catch (error) {
        logger.error(`Error al recuperar todos los registros de carrito-producto: ${error.message}`);
        next(error);
    }
};

// Mostrar un registro
export const getCarritoProducto = async (req, res, next) => {
    try {
        const carritoProducto = await CarritoProductoModel.findByPk(req.params.id);
        if (carritoProducto) {
            logger.info(`Registro de carrito-producto recuperado: ${carritoProducto.Id_carritoProducto}`);
            res.status(200).json(carritoProducto);
        } else {
            logger.warn(`Registro de carrito-producto no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Registro de carrito-producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al recuperar el registro de carrito-producto: ${error.message}`);
        next(error);
    }
};

// Crear un registro
export const createCarritoProducto = async (req, res, next) => {
    const { Id_Carrito, Id_Producto } = req.body;

    if (!Id_Carrito || !Id_Producto) {
        logger.warn('Los campos Id_Carrito e Id_Producto son obligatorios');
        return res.status(400).json({ message: 'Los campos Id_Carrito e Id_Producto son obligatorios' });
    }

    try {
        const nuevoCarritoProducto = await CarritoProductoModel.create(req.body);
        logger.info(`Registro de carrito-producto creado: ${nuevoCarritoProducto.Id_carritoProducto}`);
        res.status(201).json({ message: '¡Registro de carrito-producto creado exitosamente!', carritoProducto: nuevoCarritoProducto });
    } catch (error) {
        logger.error(`Error al crear el registro de carrito-producto: ${error.message}`);
        next(error);
    }
};

// Actualizar un registro
export const updateCarritoProducto = async (req, res, next) => {
    const { Id_Carrito, Id_Producto } = req.body;

    if (!Id_Carrito || !Id_Producto) {
        logger.warn('Los campos Id_Carrito e Id_Producto son obligatorios');
        return res.status(400).json({ message: 'Los campos Id_Carrito e Id_Producto son obligatorios' });
    }

    try {
        const [updated] = await CarritoProductoModel.update(req.body, {
            where: { Id_carritoProducto: req.params.id }
        });
        if (updated) {
            logger.info(`Registro de carrito-producto actualizado: ${req.params.id}`);
            res.status(200).json({ message: '¡Registro de carrito-producto actualizado exitosamente!' });
        } else {
            logger.warn(`Registro de carrito-producto no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Registro de carrito-producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al actualizar el registro de carrito-producto: ${error.message}`);
        next(error);
    }
};

// Borrar un registro
export const deleteCarritoProducto = async (req, res, next) => {
    try {
        const deleted = await CarritoProductoModel.destroy({
            where: { Id_carritoProducto: req.params.id }
        });
        if (deleted) {
            logger.info(`Registro de carrito-producto borrado: ${req.params.id}`);
            res.status(200).json({ message: '¡Registro de carrito-producto borrado exitosamente!' });
        } else {
            logger.warn(`Registro de carrito-producto no encontrado con id: ${req.params.id}`);
            res.status(404).json({ message: 'Registro de carrito-producto no encontrado' });
        }
    } catch (error) {
        logger.error(`Error al borrar el registro de carrito-producto: ${error.message}`);
        next(error);
    }
};



