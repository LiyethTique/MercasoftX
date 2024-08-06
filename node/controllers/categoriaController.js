import { Sequelize } from "sequelize";
import categoriaModel from "../models/categoriaModel.js";

export const getAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModel.findAll();
        res.json(categorias);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getCategoria = async (req, res) => {
    try {
        const categoria = await categoriaModel.findAll({
            where: { Id_Categoria: req.params.id }
        });
        res.json(categoria[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createCategoria = async (req, res) => {
    try {
        await categoriaModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateCategoria = async (req, res) => {
    try {
        await categoriaModel.update(req.body, {
            where: { Id_Categoria: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteCategoria = async (req, res) => {
    try {
        await categoriaModel.destroy({
            where: { Id_Categoria: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
