import { Sequelize, Op } from "sequelize";
import ProductosModel from "../models/productoModel.js";

export const getAllProductos = async (req, res) => {
    try {
        const productos = await ProductosModel.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getProducto = async (req, res) => {
    try {
        const producto = await ProductosModel.findByPk(req.params.id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProducto = async (req, res) => {
    try {
        await ProductosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const respuesta = await ProductosModel.update(req.body, {
            where: { Id_Producto: req.params.id }
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

export const deleteProducto = async (req, res) => {
    try {
        const respuesta = await ProductosModel.destroy({
            where: { Id_Producto: req.params.id }
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

export const getQueryProducto = async (req, res) => {
    try {
        const productos = await ProductosModel.findAll({
            where: {
                Id_Categoria: req.params.Id_Categoria
            }
        });
        if (productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ message: "No se encontraron registros para la categoría especificada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};