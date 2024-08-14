import { Sequelize, Op } from "sequelize";
import UnidadesModel from "../models/unidadModel.js";

export const getAllUnidades = async (req, res) => {
    try {
        const unidades = await UnidadesModel.findAll();
        res.status(200).json(unidades);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getUnidad = async (req, res) => {
    try {
        const unidad = await UnidadesModel.findByPk(req.params.id);
        if (unidad) {
            res.status(200).json(unidad);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUnidad = async (req, res) => {
    try {
        await UnidadesModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUnidad = async (req, res) => {
    try {
        const respuesta = await UnidadesModel.update(req.body, {
            where: { Id_Unidad: req.params.id }
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

export const deleteUnidad = async (req, res) => {
    try {
        const respuesta = await UnidadesModel.destroy({
            where: { Id_Unidad: req.params.id }
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

export const getQueryUnidad = async (req, res) => {
    try {
        const unidad = await UnidadesModel.findAll({
            where: {
                Nom_Unidad: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Unidad}%`
                }
            }
        });
        if (unidad.length > 0) {
            res.status(200).json(unidad);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};