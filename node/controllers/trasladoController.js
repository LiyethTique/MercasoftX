import { Sequelize, Op } from "sequelize";
import TrasladosModel from "../models/trasladoModel.js";

export const getAllTraslados = async (req, res) => {
    try {
        const traslados = await TrasladosModel.findAll();
        res.status(200).json(traslados);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getTraslado = async (req, res) => {
    try {
        const traslado = await TrasladosModel.findByPk(req.params.id);
        if (traslado) {
            res.status(200).json(traslado);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTraslado = async (req, res) => {
    try {
        await TrasladosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTraslado = async (req, res) => {
    try {
        const respuesta = await TrasladosModel.update(req.body, {
            where: { Id_Traslado: req.params.id }
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

export const deleteTraslado = async (req, res) => {
    try {
        const respuesta = await TrasladosModel.destroy({
            where: { Id_Traslado: req.params.id }
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

export const getQueryTraslado = async (req, res) => {
    try {
        const traslados = await TrasladosModel.findAll({
            where: {
                Fec_Traslado: {
                    [Sequelize.Op.like]: `%${req.params.Fec_Traslado}%`
                }
            }
        });
        if (traslados.length > 0) {
            res.status(200).json(traslados);
        } else {
            res.status(404).json({ message: "No se encontraron registros para la fecha especificada" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};