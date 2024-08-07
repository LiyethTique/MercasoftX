import { Sequelize, Op } from "sequelize";
import PedidoProductosModel from "../models/pedidoproductoModel.js";

export const getAllPedidoProductos = async (req, res) => {
    try {
        const pedidoproductos = await PedidoProductosModel.findAll();
        res.status(200).json(pedidoproductos);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getPedidoProducto = async (req, res) => {
    try {
        const pedidoproducto = await PedidoProductosModel.findByPk(req.params.id);
        if (pedidoproducto) {
            res.status(200).json(pedidoproducto);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPedidoProducto = async (req, res) => {
    try {
        await PedidoProductosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePedidoProducto = async (req, res) => {
    try {
        const respuesta = await PedidoProductosModel.update(req.body, {
            where: { Id_PedidoProducto: req.params.id }
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

export const deletePedidoProducto = async (req, res) => {
    try {
        const respuesta = await PedidoProductosModel.destroy({
            where: { Id_PedidoProducto: req.params.id }
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

export const getQueryPedidoProducto = async (req, res) => {
    try {
        const pedidoproductos = await PedidoProductosModel.findAll({
            where: {
                Id_Pedido: req.params.Id_Pedido
            }
        });
        if (pedidoproductos.length > 0) {
            res.status(200).json(pedidoproductos);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el pedido especificado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
