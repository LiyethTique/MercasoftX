import { Sequelize } from "sequelize";
import responsableModel from '../models/responsablesModel.js';




export const getAllResponsables = async (req, res) => {
    try {
        const responsables = await responsableModel.findAll();
        res.json(responsables);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getResponsable = async (req, res) => {
    try {
        const responsable = await responsableModel.findAll({
            where: { Id_Responsable: req.params.id }
        });
        res.json(responsable[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createResponsable = async (req, res) => {
    try {
        await responsableModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateResponsable = async (req, res) => {
    try {
        await responsableModel.update(req.body, {
            where: { Id_Responsable: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteResponsable = async (req, res) => {
    try {
        await responsableModel.destroy({
            where: { Id_Responsable: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
