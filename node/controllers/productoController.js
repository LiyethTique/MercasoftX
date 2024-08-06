import { Sequelize } from "sequelize";
import productoModel from "../models/productoModel.js";

export const getAllProductos = async (req, res) => {
    try {
        const productos = await productoModel.findAll();
        res.json(productos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getProducto = async (req, res) => {
    try {
        const producto = await productoModel.findAll({
            where: { Id_Producto: req.params.id }
        });
        res.json(producto[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createProducto = async (req, res) => {
    try {
        await productoModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        await productoModel.update(req.body, {
            where: { Id_Producto: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        await productoModel.destroy({
            where: { Id_Producto: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
