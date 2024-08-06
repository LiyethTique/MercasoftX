import { Sequelize } from "sequelize";
import entradaModel from "../models/entradaModel.js";

export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await entradaModel.findAll();
        res.json(entradas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getEntrada = async (req, res) => {
    try {
        const entrada = await entradaModel.findAll({
            where: { Id_Entrada: req.params.id }
        });
        res.json(entrada[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createEntrada = async (req, res) => {
    try {
        await entradaModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateEntrada = async (req, res) => {
    try {
        await entradaModel.update(req.body, {
            where: { Id_Entrada: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteEntrada = async (req, res) => {
    try {
        await entradaModel.destroy({
            where: { Id_Entrada: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
