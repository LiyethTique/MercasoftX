import { Sequelize, Op } from "sequelize";
import CarritosModel from "../models/carritoModel.js";

export const getAllCarritos = async (req, res) => {
    try {
        const carritos = await CarritosModel.findAll();
        res.status(200).json(carritos);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getCarrito = async (req, res) => {
    try {
        const carrito = await CarritosModel.findByPk(req.params.id);
        if (carrito) {
            res.status(200).json(carrito);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCarrito = async (req, res) => {
    try {
        await CarritosModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCarrito = async (req, res) => {
    try {
        const respuesta = await CarritosModel.update(req.body, {
            where: { Id_Carrito: req.params.id }
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

export const deleteCarrito = async (req, res) => {
    try {
        const respuesta = await CarritosModel.destroy({
            where: { Id_Carrito: req.params.id }
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