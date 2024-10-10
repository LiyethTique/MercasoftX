import { Sequelize } from "sequelize";
import ClientesModel from "../models/clienteModel.js";

// Obtener todos los clientes
export const getAllClientes = async (req, res) => {
    try {
        const clientes = await ClientesModel.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(404).json({ message: "No se encontraron registros" });
    }
};

// Obtener un cliente por ID
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

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { Nom_Cliente, Cor_Cliente, Tel_Cliente, Dir_Cliente, Tip_Cliente } = req.body;

    // Validación de campos obligatorios
    if (!Nom_Cliente || !Tel_Cliente || !Dir_Cliente || !Tip_Cliente) {
        return res.status(400).json({ message: 'Los campos Nombre, Teléfono, Dirección y Tipo son obligatorios' });
    }

    try {
       const cliente =  await ClientesModel.create(req.body);
       console.log(cliente)
        res.status(201).json({ message: "¡Registro creado exitosamente!", cliente: cliente  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    const { Nom_Cliente, Cor_Cliente, Tel_Cliente, Dir_Cliente, Tip_Cliente } = req.body;

    // Validación de campos obligatorios
    if (!Nom_Cliente || !Tel_Cliente || !Dir_Cliente || !Tip_Cliente) {
        return res.status(400).json({ message: 'Los campos Nombre, Teléfono, Dirección y Tipo son obligatorios' });
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

// Eliminar un cliente
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
