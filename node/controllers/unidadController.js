import { Sequelize } from "sequelize";
import unidadModel from "../models/unidadModel.js";

export const getAllUnidades = async (req, res) => {
    try {
        const unidades = await unidadModel.findAll();
        res.json(unidades);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await unidadModel.findAll({
            where: { Id_Unidad: req.params.id }
        });
        res.json(unidad[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createUnidad = async (req, res) => {
    try {
        await unidadModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateUnidad = async (req, res) => {
    try {
        await unidadModel.update(req.body, {
            where: { Id_Unidad: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteUnidad = async (req, res) => {
    try {
        await unidadModel.destroy({
            where: { Id_Unidad: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
