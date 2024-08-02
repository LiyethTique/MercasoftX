import { Sequelize } from "sequelize";
import VentaModel from "../models/ventaModel.js";

// Mostrar todos los registros
export const getAllVenta = async (req, res) => {
    try {
        const ventas = await ventaModel.findAll();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mostrar un registro
export const getVenta = async (req, res) => {
    try {
        const venta = await ventaModel.findAll({
            where: { id: req.params.id }
        });
        if (venta.length > 0) {
            res.status(200).json(venta[0]);
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear una Venta
export const createVenta = async (req, res) => {
    try {
        const nuevaVenta = await ventaModel.create(req.body);
        res.status(201).json({ message: '¡Registro Creado Exitosamente!', venta: nuevaVenta });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Actualizar un registro 
export const updateVenta = async (req, res) => {
    try {
        const [updated] = await ventaModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro Actualizado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Borrar un registro
export const deleteVenta = async (req, res) => {
    try {
        const deleted = await ventaModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro Borrado Exitosamente!' });
        } else {
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Consulta personalizada
export const getQueryVenta = async (req, res) => {
    try {
        const ventas = await VentaModel.findAll({
            where: {
                id: {
                    [Sequelize.Op.like]: `%${req.params.id}%`
                }
            }
        });
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
