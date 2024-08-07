import { Sequelize, Op } from "sequelize";
import PedidosModel from "../models/pedidoModel.js";

export const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await PedidosModel.findAll();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getPedido = async (req, res) => {
    try {
        const pedido = await PedidosModel.findByPk(req.params.id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPedido = async (req, res) => {
    try {
        await PedidosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePedido = async (req, res) => {
    try {
        const respuesta = await PedidosModel.update(req.body, {
            where: { Id_Pedido: req.params.id }
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

export const deletePedido = async (req, res) => {
    try {
        const respuesta = await PedidosModel.destroy({
            where: { Id_Pedido: req.params.id }
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

export const getQueryPedido = async (req, res) => {
    try {
        const pedidos = await PedidosModel.findAll({
            where: {
                Id_Cliente: req.params.Id_Cliente
            }
        });
        if (pedidos.length > 0) {
            res.status(200).json(pedidos);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el cliente especificado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
