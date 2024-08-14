import { Sequelize, Op } from "sequelize";
import CategoriasModel from "../models/categoriaModel.js";

export const getAllCategorias = async (req, res) => {
    try {
        const categorias = await CategoriasModel.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getCategoria = async (req, res) => {
    try {
        const categoria = await CategoriasModel.findByPk(req.params.id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategoria = async (req, res) => {
    try {
        await CategoriasModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategoria = async (req, res) => {
    try {
        const respuesta = await CategoriasModel.update(req.body, {
            where: { Id_Categoria: req.params.id }
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

export const deleteCategoria = async (req, res) => {
    try {
        const respuesta = await CategoriasModel.destroy({
            where: { Id_Categoria: req.params.id }
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

export const getQueryCategoria = async (req, res) => {
    try {
        const categoria = await CategoriasModel.findAll({
            where: {
                Nom_Categoria: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Categoria}%`
                }
            }
        })
        if(categoria.length > 0){
            res.status(200).json(categoria)
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}