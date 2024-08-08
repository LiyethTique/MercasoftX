import { Sequelize } from 'sequelize';
import ClienteModel from '../models/clienteModel.js'; // ajusta la importación según la ubicación de tu modelo

// Obtener todos los clientes
export const getAllClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll();
        if (clientes.length > 0) {
            res.status(200).json(clientes);
        } else {
            res.status(404).json({ message: 'No se encontraron clientes' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un cliente por ID
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findByPk(req.params.id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.create(req.body);
        res.status(201).json({ message: '¡Registro del cliente creado exitosamente!', cliente });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    try {
        const [updated] = await ClienteModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.status(200).json({ message: '¡Registro del cliente actualizado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Borrar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const deleted = await ClienteModel.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: '¡Registro del cliente borrado exitosamente!' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultar clientes por nombre
export const getQueryCliente = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll({
            where: {
                Nom_Cliente: {
                    [Sequelize.Op.like]: `%${req.params.Nom_Cliente}%`
                }
            }
        });
        if (clientes.length > 0) {
            res.status(200).json(clientes);
        } else {
            res.status(404).json({ message: 'No se encontraron clientes con ese nombre' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
