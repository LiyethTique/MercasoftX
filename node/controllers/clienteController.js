import { Sequelize } from "sequelize";
import clienteModel from "../models/clienteModel.js";

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.findAll();
        res.json(clientes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getCliente = async (req, res) => {
    try {
        const cliente = await clienteModel.findAll({
            where: { Id_Cliente: req.params.id }
        });
        res.json(cliente[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
        await clienteModel.create(req.body);
        res.json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        await clienteModel.update(req.body, {
            where: { Id_Cliente: req.params.id }
        });
        res.json({ message: "¡Registro actualizado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        await clienteModel.destroy({
            where: { Id_Cliente: req.params.id }
        });
        res.json({ message: "¡Registro borrado exitosamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
