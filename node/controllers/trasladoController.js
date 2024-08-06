import { Sequelize } from "sequelize";
import trasladoModel from "../models/trasladoModel.js";

export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await trasladoModel.findAll();
        res.json(traslados);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getTraslado = async (req, res) => {
    try {
        const traslado = await trasladoModel.findAll({
            where: { Id_Traslado: req.params.id }
        });
        res.json(traslado[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createTraslado = async (req, res) => {
    try {
        await trasladoModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateTraslado = async (req, res) => {
    try {
        await trasladoModel.update(req.body, {
            where: { Id_Traslado: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteTraslado = async (req, res) => {
    try {
        await trasladoModel.destroy({
            where: { Id_Traslado: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
