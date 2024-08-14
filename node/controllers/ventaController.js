import { Sequelize, Op } from "sequelize";
import VentasModel from "../models/ventaModel.js";

export const getAllVentas = async (req, res) => {
    try {
        const ventas = await VentasModel.findAll();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await VentasModel.findByPk(req.params.id);
        if (venta) {
            res.status(200).json(venta);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVenta = async (req, res) => {
    try {
        await VentasModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVenta = async (req, res) => {
    try {
        const respuesta = await VentasModel.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        if (respuesta[0] > 0) {
            res.status(200).json({ message: "¡Registro actualizado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVenta = async (req, res) => {
    try {
        const respuesta = await VentasModel.destroy({
            where: { Id_Venta: req.params.id }
        });
        if (respuesta > 0) {
            res.status(200).json({ message: "¡Registro eliminado exitosamente!" });
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQueryVenta = async (req, res) => {
    try {
        const ventas = await VentasModel.findAll({
            where: {
                Fec_Venta: {
                    [Sequelize.Op.like]: `%${req.params.Fec_Venta}%`
                }
            }
        });
        if (ventas.length > 0) {
            res.status(200).json(ventas);
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};