import { Sequelize } from "sequelize";
import Venta from "../models/ventaModel.js";

// Mostrar todos los registros
export const getAllVenta = async (req, res) => {
    try {
        const ventas = await Venta.findAll();
        if (ventas.length > 0) {
            res.status(200).json(ventas);
        } else {
            res.status(404).json({ message: "No existen Ventas" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un registro
export const getVenta = async (req, res) => {
    try {
        const venta = await Venta.findOne({
            where: { Id_Venta: req.params.id }
        });
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Crear una Venta
export const createVenta = async (req, res) => {
    try {
        const nuevaVenta = await Venta.create(req.body);
        res.status(201).json({ message: '¡Registro Creado Exitosamente!', venta: nuevaVenta });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un registro
export const updateVenta = async (req, res) => {
    try {
        const [affectedRows] = await Venta.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: '¡Registro Actualizado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Borrar un registro
export const deleteVenta = async (req, res) => {
    try {
        const deleted = await Venta.destroy({
            where: { Id_Venta: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro Borrado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Consulta personalizada
export const getQueryVenta = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            where: {
                Id_Venta: {
                    [Sequelize.Op.like]: `%${req.params.id}%`
                }
            }
        });
        if (ventas.length > 0) {
            res.status(200).json(ventas);
        } else {
            res.status(404).json({ message: 'No se encontraron ventas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
