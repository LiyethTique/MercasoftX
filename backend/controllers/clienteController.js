import { Sequelize } from "sequelize";
import ClientesModel from "../models/clienteModel.js";

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await ClientesModel.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

export const getCliente = async (req, res) => {
    try {
        const cliente = await ClientesModel.findByPk(req.params.id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: "Registro no encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCliente = async (req, res) => {
    const { Nom_Cliente, Cor_Cliente, Tel_Cliente } = req.body;

    if (!Nom_Cliente || !Cor_Cliente || !Tel_Cliente) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        await ClientesModel.create(req.body);
        res.status(201).json({ message: "¡Registro creado exitosamente!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCliente = async (req, res) => {
    const { Nom_Cliente, Cor_Cliente, Tel_Cliente } = req.body;

    if (!Nom_Cliente || !Cor_Cliente || !Tel_Cliente) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const respuesta = await ClientesModel.update(req.body, {
            where: { Id_Cliente: req.params.id }
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

export const deleteCliente = async (req, res) => {
    try {
        const respuesta = await ClientesModel.destroy({
            where: { Id_Cliente: req.params.id }
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

export const getQueryCliente = async (req, res) => {
    try {
        const { Nom_Cliente } = req.params;
        const clientes = await ClientesModel.findAll({
            where: {
                Nom_Cliente: {
                    [Sequelize.Op.like]: `%${Nom_Cliente}%`
                }
            }
        });

        if (clientes.length > 0) {
            res.status(200).json(clientes);
        } else {
            res.status(404).json({ message: "No se encontraron registros para el nombre especificado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
