import { Sequelize } from "sequelize";
import ventaModel from "../models/ventaModel.js";

export const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventaModel.findAll();
        res.json(ventas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getVenta = async (req, res) => {
    try {
        const venta = await ventaModel.findAll({
            where: { Id_Venta: req.params.id }
        });
        res.json(venta[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createVenta = async (req, res) => {
    try {
        await ventaModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateVenta = async (req, res) => {
    try {
        await ventaModel.update(req.body, {
            where: { Id_Venta: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteVenta = async (req, res) => {
    try {
        await ventaModel.destroy({
            where: { Id_Venta: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
