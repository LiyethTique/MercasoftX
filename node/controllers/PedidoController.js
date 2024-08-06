import { Sequelize } from "sequelize";
import pedidoModel from "../models/pedidoModel.js";

export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await pedidoModel.findAll();
        res.json(pedidos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getPedido = async (req, res) => {
    try {
        const pedido = await pedidoModel.findAll({
            where: { Id_Pedido: req.params.id }
        });
        res.json(pedido[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createPedido = async (req, res) => {
    try {
        await pedidoModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updatePedido = async (req, res) => {
    try {
        await pedidoModel.update(req.body, {
            where: { Id_Pedido: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deletePedido = async (req, res) => {
    try {
        await pedidoModel.destroy({
            where: { Id_Pedido: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
