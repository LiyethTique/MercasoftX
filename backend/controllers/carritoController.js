import { Sequelize } from "sequelize";
import CarritoModel from "../models/carritoModel.js";

// Mostrar todos los registros
export const getAllCarrito = async (req, res) => {
    try {
        const carritos = await CarritoModel.findAll();

        res.status(200).json(carritos);
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar todos los carritos', error: error.message });
    }
}

// Mostrar un registro
export const getCarrito = async (req, res) => {
    try {
        const carrito = await CarritoModel.findAll({
            where: { Id_Carrito: req.params.id }
        });
        if (carrito.length > 0) {
            res.status(200).json(carrito[0]);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar el carrito', error: error.message });
    }
}

// Crear un carrito
export const createCarrito = async (req, res) => {
    const { Id_Producto, Can_Producto, Id_Cliente } = req.body;

    if (!Id_Producto || !Can_Producto || !Id_Cliente) {
        return res.status(400).json({ message: 'Los campos Id_Producto, Can_Producto e Id_Cliente son obligatorios' });
    }

    try {
        const nuevoCarrito = await CarritoModel.create(req.body);

        res.status(201).json({ message: '¡Carrito creado exitosamente!', carrito: nuevoCarrito });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el carrito', error: error.message });
    }
}

// Actualizar un carrito
export const updateCarrito = async (req, res) => {
    const { Id_Producto, Can_Producto, Id_Cliente } = req.body;

    if (!Id_Producto || !Can_Producto || !Id_Cliente) {
        return res.status(400).json({ message: 'Los campos Id_Producto, Can_Producto e Id_Cliente son obligatorios' });
    }

    try {
        const [updated] = await CarritoModel.update(req.body, {
            where: { Id_Carrito: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Carrito actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el carrito', error: error.message });
    }
}

// Borrar un carrito
export const deleteCarrito = async (req, res) => {
    try {
        const deleted = await CarritoModel.destroy({
            where: { Id_Carrito: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Carrito borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar el carrito', error: error.message });
    }
}

// Consultar carritos por Id_Cliente
export const getQueryCarrito = async (req, res) => {
    try {
        const carritos = await CarritoModel.findAll({
            where: {
                Id_Cliente: req.params.Id_Cliente
            }
        });
        if (carritos.length > 0) {
            res.status(200).json(carritos);
        } else {
            res.status(404).json({ message: 'No se encontraron carritos para el cliente especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
    }
}
