import { Sequelize, Op } from "sequelize";
import ResponsablesModel from "../models/responsableModel.js";

export const getAllResponsables = async (req, res) => {
    try {
        const responsables = await ResponsablesModel.findAll();
        res.status(200).json(responsables);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getResponsable = async (req, res) => {
    try {
        const responsable = await ResponsablesModel.findByPk(req.params.id);
        if (responsable) {
            res.status(200).json(responsable);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createResponsable = async (req, res) => {
    try {
        await ResponsablesModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateResponsable = async (req, res) => {
    try {
        const respuesta = await ResponsablesModel.update(req.body, {
            where: { Id_Responsable: req.params.id }
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

export const deleteResponsable = async (req, res) => {
    try {
        const respuesta = await ResponsablesModel.destroy({
            where: { Id_Responsable: req.params.id }
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

export const getQueryResponsable = async (req, res) => {
    try {
        const responsables = await ResponsablesModel.findAll({
            where: {
                Nom_Responsable: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Responsable}%`
                }
            }
        });
        if (responsables.length > 0) {
            res.status(200).json(responsables);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};