import { Sequelize } from "sequelize";
import pedidoProductoModel from "../models/pedidoProductoModel.js";

export const getAllPedidoProductos = async (req, res) => {
    try {
        const pedidoProductos = await pedidoProductoModel.findAll();
        res.json(pedidoProductos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getPedidoProducto = async (req, res) => {
    try {
        const pedidoProducto = await pedidoProductoModel.findAll({
            where: { Id_PedidoProducto: req.params.id }
        });
        res.json(pedidoProducto[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createPedidoProducto = async (req, res) => {
    try {
        await pedidoProductoModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updatePedidoProducto = async (req, res) => {
    try {
        await pedidoProductoModel.update(req.body, {
            where: { Id_PedidoProducto: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deletePedidoProducto = async (req, res) => {
    try {
        await pedidoProductoModel.destroy({
            where: { Id_PedidoProducto: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
